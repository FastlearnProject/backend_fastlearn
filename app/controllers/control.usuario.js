import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conexion from "../config/db.config.js";

export const crearusuario = async (req, res) => {
  const { nombre, correo, contrasenaPlain, fechaNacimiento, telefono } = req.body;

  // Validar los datos de entrada
  if (!nombre || !correo || !contrasenaPlain || !fechaNacimiento || !telefono) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Hashear la contraseña
    const contrasenaHash = await bcrypt.hash(contrasenaPlain, 10);

    // Ejecutar el procedimiento almacenado
    const respuesta = await conexion.query(
      `CALL sp_insertarusuario(?, ?, ?, ?, 'null', 'null', ?)`,
      [nombre, correo, contrasenaHash, fechaNacimiento,telefono]
    );

    // Verificar la respuesta del procedimiento almacenado
    if (respuesta[0] && respuesta[0][0] && respuesta[0][0].id_usuario) {
      const usuario = respuesta[0][0];
      const idUsuario = usuario.id_usuario;
      const payload = { id_usuario: idUsuario, nombre, correo };

      // Generar el token
      const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      });

      return res.status(201).json({ message: "Usuario creado exitosamente", token });
    } else {
      console.error("No se pudo crear el usuario, respuesta de la base de datos:", respuesta);
      return res.status(200).json({ message: "No se pudo crear el usuario" });
    }
  } catch (err) {
    console.error("Error al crear usuario:", err);
    return res.status(500).json({ message: "Error en el servidor, por favor intentalo de nuevo más tarde" });
  }
};

export const mostrarusuario = async (req, res) => {
  const id = req.params.id;
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarusuario(${id})`);
    if (respuesta[0].length > 0) {
      return res.status(200).json(respuesta[0][0]);
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error("Error al mostrar usuario:", err);
    return res
      .status(500)
      .json({
        message: "Error en el servidor, por favor intentalo de nuevo más tarde",
      });
  }
};

export const mostrarusuarios = async (req, res) => {
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarusuarios()`);
    return res.status(200).json(respuesta[0]);
  } catch (err) {
    console.error("Error al mostrar usuarios:", err);
    return res
      .status(500)
      .json({
        message: "Error en el servidor, por favor intentalo de nuevo más tarde",
      });
  }
};

export const modificarusuario = async (req, res) => {
  const {
    id,
    nombre,
    correo,
    contrasenaPlain,
    fechaNacimiento,
    genero,
    telefono,
  } = req.body;

  try {
    const contrasenaHash = await bcrypt.hash(contrasenaPlain, 10);
    const contrasena = contrasenaHash;
    const respuesta = await conexion.query(
      `CALL sp_modificarusuario(${id}, '${nombre}', '${correo}', '${contrasena}', '${fechaNacimiento}', '${genero}', '${telefono}')`
    );

    if (respuesta[0].affectedRows === 1) {
      return res
        .status(200)
        .json({ message: "Usuario modificado exitosamente" });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error("Error al modificar usuario:", err);
    return res
      .status(500)
      .json({
        message: "Error en el servidor, por favor intentalo de nuevo más tarde",
      });
  }
};

export const modificarRolUsuario = async (req, res) => {
  const { rol } = req.body;
  const { id_usuario } = req.user;
  const { correo } = req.user;

  try {
    console.log("Id del usuario:", id_usuario);
    console.log("Correo del usuario:", correo);
    console.log("Rol seleccionado:", rol);

    const [result] = await conexion.query("CALL sp_modificarrol(?, ?)", [
      correo,
      rol,
    ]);

    console.log("Resultado de la consulta:", result);

    if (result && result.affectedRows === 1) {
      const payload = { id_usuario, correo, rol };
      const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      });

      return res
        .status(200)
        .json({ message: "Rol actualizado exitosamente", token });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error("Error al actualizar el rol:", err);
    return res
      .status(500)
      .json({
        message: "Error en el servidor, por favor intentalo de nuevo más tarde",
      });
  }
};

export const eliminarusuario = async (req, res) => {
  const id = req.params.id;
  try {
    const respuesta = await conexion.query(`CALL sp_eliminarusuario(${id})`);
    if (respuesta[0].affectedRows === 1) {
      return res
        .status(200)
        .json({ message: "Usuario eliminado exitosamente" });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    return res
      .status(500)
      .json({
        message: "Error en el servidor, por favor intentalo de nuevo más tarde",
      });
  }
};

export const logueoUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows] = await conexion.query("CALL sp_buscarusuario(?)", [correo]);

    if (rows.length === 0 || rows[0].length === 0) {
      return res.status(401).json({ message: "Usuario no existe" });
    }

    const usuario = rows[0][0];
    const match = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      return res.status(401).json({ message: "Clave incorrecta" });
    }

    const payload = {
      id_usuario: usuario.id_usuario,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    return res
      .status(500)
      .json({
        message: "Error en el servidor, por favor intentalo de nuevo más tarde",
      });
  }
};
