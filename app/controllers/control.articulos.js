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
      console.error("Error al crear articulo:", error);
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
      console.error("Error al mostrar articulos:", error);
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
      console.error("Error al mostrar articulos:", error);
      return res.status(500).json({
        message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
      });
    }
  }

  const mostrarArticuloUsuario = async (req, res)=>{
    const id = req.params['id'];
    try {
      const respuesta = await conexion.query(`CALL sp_mostrararticulouser(${id})`);
      return res.status(200).json(respuesta[0]);
    } catch (error) {
      console.error("Error al mostrar articulos:", error);
      return res.status(500).json({
        message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
      });
    }
  }

  const eliminarArticulo = async (req, res) => {
    const id = req.params.id;
    try {
      const respuesta = await conexion.query(`CALL sp_eliminararticulo(${id})`);
      if (respuesta[0].affectedRows === 1) {
        return res
          .status(200)
          .json({ message: "Articulo eliminado exitosamente" });
      } else {
        return res.status(404).json({ message: "Articulo no encontrado" });
      }
    } catch (err) {
      console.error("Error al eliminar articulo:", err);
      return res
        .status(500)
        .json({
          message: "Error en el servidor, por favor intentalo de nuevo más tarde",
        });
    }
  };

  export {insertarArticulo, mostrarArticulos, mostrarArticulo, eliminarArticulo, mostrarArticuloUsuario};