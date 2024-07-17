import conexion from "../config/db.config.js";

const insertarArticulo = async (req, res) => {
    const { id_usuario, titulo, texto1, texto2, texto3, texto4 } = req.body;
  
    try {
      const respuesta = await conexion.query(
        `CALL sp_insertararticulo(${id_usuario}, '${titulo}','${texto1}','${texto2}', '${texto3}', '${texto4}')`
      );
  
      if (respuesta[0].affectedRows == 1) {
        return res.status(201).json({
          message: "Articulo creado exitosamente",
        });
      } else {
        return res.status(200).json({ message: "No se pudo crear el articulo" });
      }
    } catch (error) {
      console.error("Error al crear curso:", error);
      return res.status(500).json({
        message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
      });
    }
  };
  
  const mostrarArticulos = async (req, res) => {
    try {
      const respuesta = await conexion.query(`CALL sp_mostrararticulos()`);
      return res.status(200).json(respuesta[0]);
    } catch (error) {
      console.error("Error al mostrar cursos:", error);
      return res.status(500).json({
        message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
      });
    }
  };

  const mostrarArticulo = async (req, res)=>{
    const id = req.params['id'];
    try {
      const respuesta = await conexion.query(`CALL sp_mostrararticulo(${id})`);
      return res.status(200).json(respuesta[0]);
    } catch (error) {
      console.error("Error al mostrar cursos:", error);
      return res.status(500).json({
        message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
      });
    }
  }
  export {insertarArticulo, mostrarArticulos, mostrarArticulo};