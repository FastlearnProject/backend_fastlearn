import { Router } from "express";

const rutaMain = Router();

rutaMain.get("/", (req, res) =>{
    res.json("Inicio del backend")
})

export default rutaMain;