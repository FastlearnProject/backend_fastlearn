/**
 * Este es el controlador de cursos
 * @module ctr-cursos
 */
import conexion from "../config/db.config.js";

/**
 * Con esta función se crean o insertan los apartados de los cursos.
 * @param {object} req Pide la información a ingresar, Imagen, Nombre, Descripción, Link y tags.
 * @param {object} res Envía la información necesaria ingresada.
 * 
 */
 const insertarCurso = async (req, res) => {
    const { imgCurso, nomCurso, desCurso, linkCurso, tagsCurso } = req.body;
  
    try {
      const respuesta = await conexion.query(
        `CALL sp_insertarcurso('${imgCurso}','${nomCurso}', '${desCurso}', '${linkCurso}', '${tagsCurso}' )`
      );
  
      if (respuesta[0].affectedRows == 1) {
        const curso = respuesta[0][0];
        return res.status(201).json({
          message: "Curso creado exitosamente",
          curso: curso, 
        });
      } else {
        return res.status(200).json({ message: "No se pudo crear el curso" });
      }
    } catch (err) {
      console.error("Error al crear curso:", err);
      return res.status(500).json({
        message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
      });
    }
  };
  
  /**
   * Esto muestra los cursos creados a partir de la función "insertarCurso"
   * 
   * @param {Object} req captura peticiones en HTML
   * @param {Object} res  envia peticiones en HTML
   *
   */
 const mostrarCursos = async (req, res) => {
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarcursos()`);
    return res.status(200).json(respuesta[0]);
  } catch (error) {
    console.error("Error al mostrar cursos:", err);
    return res.status(500).json({
      message: "Error en el servidor, por favor intentalo de nuevo más tarde",
    });
  }
};

  /**
   * Esto muestra los cursos
   * 
   * @param {Object} req captura peticiones en HTML
   * @param {Object} res  envia peticiones en HTML
   *
   */
 const mostrarCursosFree = async(req, res) =>{
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarcursos()`);
    return res.status(200).json(respuesta[0]);
  } catch (error) {
    console.error("Erorr al mostrar cursos: ", err);
    return res.status(500).json({
      message: "Error en el servidor, por favor intentalo de nuevo más tarde",
    })
  }
}

export {insertarCurso, mostrarCursos, mostrarCursosFree};
