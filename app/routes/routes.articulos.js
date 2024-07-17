import { Router } from "express";
import { eliminarArticulo, insertarArticulo, mostrarArticulo, mostrarArticuloUsuario, mostrarArticulos } from "../controllers/control.articulos";
import { verifyToken } from "../middlewares/oauth.js";


const rutaArticulos = Router();

rutaArticulos.post("/articles", verifyToken, insertarArticulo);
rutaArticulos.get("/articles",  verifyToken, mostrarArticulos);
rutaArticulos.get("/articles/:id", verifyToken, mostrarArticulo);
rutaArticulos.delete("/articles/:id", verifyToken, eliminarArticulo);
rutaArticulos.get("/articlesUser/:id", verifyToken, mostrarArticuloUsuario);

export default rutaArticulos;