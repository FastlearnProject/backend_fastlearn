import { Router } from "express";
import { insertarArticulo, mostrarArticulo, mostrarArticulos } from "../controllers/control.articulos";
import { verifyToken } from "../middlewares/oauth.js";


const rutaArticulos = Router();

rutaArticulos.post("/articles", verifyToken, insertarArticulo);
rutaArticulos.get("/articles", verifyToken, mostrarArticulos);
rutaArticulos.get("/articles/:id", verifyToken, mostrarArticulo);

export default rutaArticulos;