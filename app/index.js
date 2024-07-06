import app from "./app.js";

/**
 * Inicio del servidor y escucha en el puerto especifico.
 * @callback listen
 */
app.listen(app.get("port"), () =>{
    console.log(`Ejecutandose en: http://localhost:${app.get("port")}`)
})