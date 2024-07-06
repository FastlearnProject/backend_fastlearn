import express, { Router } from "express";
import cors from "cors"
import { config } from "dotenv";
import ruta from "./routes/index.js";

config();


/**
 * Configuaración y creación de Express.
 * 
 * @type {object}
 */
const app = express();

// Middleware para tener en cuenta el JSON..
app.use(express.json());

// Middleware para tener en cuenta URL-encoded.
app.use(express.urlencoded({ extended : true}));

// Configuración del puerto de la aplicación.
app.set("port", process.env.PORT || 6000);

//Middleware para habilitar CORS.
app.use(cors());

/**
 * Middleware principal para manejar las rutas de la aplicación.
 * @type {Router}
 */
app.use("/", ruta);

export default app;