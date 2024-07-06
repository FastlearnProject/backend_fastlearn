import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { incompleto } from "../message/mensajes.js";
config();


/**
 * Middleware para verificar el token (JWT).
 * 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {Function} next - La función next para pasar al siguiente middleware.
 */
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("Token no proporcionado");
        return incompleto(req, res, 401, "Token no proporcionado");
    }

    try {
        const valida = await jwt.verify(token, process.env.TOKEN_PRIVATEKEY);
        req.user = valida;
        next();
    } catch (e) {
        console.log("Error al verificar token:", e);
        return incompleto(req, res, 401, "Token no válido");
    }
}
