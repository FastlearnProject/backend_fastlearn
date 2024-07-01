import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conexion from "../config/db.config.js";
import { completo, incompleto } from "../message/mensajes.js";
import { config } from "dotenv";
config();

// Creaciones usuario

export const crearusuario = async (req, res) => {
    const { nombre, correo, contrasenaPlain, fechaNacimiento, telefono } = req.body;

    try {
        const contrasenaHash = await bcrypt.hash(contrasenaPlain, 10);
        const contrasena = contrasenaHash;
        const respuesta = await conexion.query(`CALL sp_insertarusuario('${nombre}', '${correo}', '${contrasena}', '${fechaNacimiento}', 'null', 'null', '${telefono}')`);

        if (respuesta[0].affectedRows == 1) {
            const idConsulta = await conexion.query("SELECT LAST_INSERT_ID() AS id");
            const nuevoUsuarioId = idConsulta[0][0].id;

            const payload = {
                id: nuevoUsuarioId,
                nombre: nombre,
                correo: correo
            };

            const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, { expiresIn: process.env.TOKEN_EXPIRES_IN });

            return res.status(201).json({ message: "Usuario creado exitosamente", token }); // Asegúrate de enviar el token correctamente
        } else {
            return res.status(200).json({ message: "No se pudo crear el usuario" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error en el servidor, por favor intentalo de nuevo más tarde" });
    }
};

// Obtener usuario(s)

export const mostrarusuario = async (req, res) => {
    const id = req.params['id'];
    try {
        const respuesta = await conexion.query(`CALL sp_mostrarusuario(${id})`);
        completo(req, res, 200, respuesta[0]);
    } catch (err) {
        incompleto(req, res, 400, respuesta[0]);
    }
}

export const mostrarusuarios = async (req, res) => {
    try {
        const respuesta = await conexion.query(`CALL sp_mostrarusuarios()`);
        completo(req, res, 200, respuesta[0]);
    } catch (err) {
        incompleto(req, res, 400, respuesta[0]);
    }
}

// Modificar usuario

export const modificarusuario = async(req, res)=>{
    const {id, nombre, correo, contrasenaPlain, fechaNacimiento, genero, telefono} = req.body;

    try {
        const contrasenaHash = await bcrypt.hash(contrasenaPlain, 10);
        const contrasena = contrasenaHash;
        const respuesta = await conexion.query(`CALL sp_modificarusuario(${id}, '${nombre}', '${correo}', '${contrasena}', '${fechaNacimiento}', '${genero}', '${telefono}')`);

        if (respuesta[0].affectedRows == 1) {
            completo(req, res, 201, "Usuario modificado exitosamente");
        } else {
            completo(req, res, 200, "No se pudo modificar el usuario");
        }
    } catch (err) {
        incompleto(req, res, 500, "Error en el servidor, por favor intentalo de nuevo más tarde");
    }
}

export const modificarRolUsuario = async (req, res) => {
    const { rol } = req.body;
    const { correo } = req.user;

    try {
        console.log("Correo del usuario:", correo);
        console.log("Rol seleccionado:", rol);

        const [result] = await conexion.query('CALL sp_modificarrol(?, ?)', [correo, rol]);

        if (result.affectedRows === 1) {
            const payload = { correo, rol };
            const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, { expiresIn: process.env.TOKEN_EXPIRES_IN });

            return res.status(200).json({ message: 'Rol actualizado exitosamente', token });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error al actualizar el rol:', err);
        return res.status(500).json({ message: 'Error en el servidor, por favor intentalo de nuevo más tarde' });
    }
};

export const eliminarusuario = async(req, res)=>{
    const id = req.params['id'];
    try {
        const respuesta = await conexion.query(`CALL sp_eliminarusuario(${id})`);
        if (respuesta[0].affectedRows == 1) {
            completo(req, res, 200, "Usuario eliminado");
        } else {
            completo(req, res, 200, "Usuario no se pudo eliminar");
        }
    } catch (err) {
        incompleto(req, res, 400, "Error interno: Intente de nuevo");
    }
}

export const logueoUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows] = await conexion.query('CALL sp_buscarusuario(?)', [correo]);

    if (rows.length === 0 || rows[0].length === 0) {
      return res.status(401).json({ message: "Usuario no existe" });
    }

    const usuario = rows[0][0];
    const match = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      return res.status(401).json({ message: "Clave incorrecta" });
    }

    const payload = {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol // Asegúrate de que el rol esté incluido en el payload
    };

    const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, { expiresIn: process.env.TOKEN_EXPIRES_IN });

    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor, por favor intentalo de nuevo más tarde" });
  }
};