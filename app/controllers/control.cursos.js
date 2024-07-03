import conexion from "../config/db.config.js";

export const insertarCurso = async (req, res) => {
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
  

export const mostrarCursos = async (req, res) => {
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarcursos()`);
    return res.status(200).json(respuesta[0]);
  } catch (error) {
    console.error("Error al mostrar usuarios:", err);
    return res.status(500).json({
      message: "Error en el servidor, por favor intentalo de nuevo más tarde",
    });
  }
};
