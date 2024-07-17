import conexion from "../config/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const mostrarAdmins = async (req, res ) =>{
    try {
        const respuesta = await conexion.query(`CALL sp_mostraradmins()`);
        return res.status(200).json(respuesta[0]);
      } catch (error) {
        console.error("Error al mostrar cursos:", error);
        return res.status(500).json({
          message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
        });
      }
}

const mostrarAdmin = async (req, res ) =>{
  const id = req.params['id'];

  try {
      const respuesta = await conexion.query(`CALL sp_mostraradmin(${id})`);
      return res.status(200).json(respuesta[0]);
    } catch (error) {
      console.error("Error al mostrar cursos:", error);
      return res.status(500).json({
        message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
      });
    }
}

const logueoAdmin = async (req, res) => {
    const { correo, contrasena } = req.body;

  try {
    const [rows] = await conexion.query("CALL sp_buscaradmin(?)", [correo]);

    if (rows.length === 0 || rows[0].length === 0) {
      return res.status(401).json({ message: "Aministrador no existe" });
    }

    const admin = rows[0][0];
    const match = await bcrypt.compare(contrasena, admin.contrasena);

    if (!match) {
      return res.status(401).json({ message: "Clave incorrecta" });
    }

    const payload = {
      id_admin: admin.id_admin,
      correo: admin.correo,
      rol: admin.rol,
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
}

export {mostrarAdmin, mostrarAdmins, logueoAdmin}