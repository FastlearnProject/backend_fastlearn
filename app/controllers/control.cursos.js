import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import conexion from "../config/db.config.js";
import { config } from "dotenv";
config();

// Configurar Azure Blob Storage
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);


// Configurar multer para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Función para subir imagen a Azure Blob Storage
const uploadToBlobStorage = async (buffer, fileName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    const uploadBlobResponse = await blockBlobClient.uploadData(buffer);
    console.log(`Archivo ${fileName} subido a Azure Blob Storage`);
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error al subir la imagen a Azure Blob Storage:', error.message);
    throw error;
  }
};

// Controlador para insertar curso
const insertarCurso = async (req, res) => {
  const { titulo, descripcion, linkCurso, tagsCurso, categoria } = req.body;
  const imagen = req.files['imagen'][0]; // Accede al primer archivo de imagen
  const video = req.files['video'][0]; 

  const imageName = imagen.originalname;
  const videoName = video.originalname;

  try {
    const imageUrl = await uploadToBlobStorage(imagen.buffer, imageName);
    const videoUrl = await uploadToBlobStorage(video.buffer, videoName);
    const respuesta = await conexion.query(
      `CALL sp_insertarcurso('${imageUrl}','${videoUrl}','${titulo}', '${descripcion}', '${linkCurso}', '${tagsCurso}', '${categoria}')`
    );

    if (respuesta[0].affectedRows == 1) {
      return res.status(201).json({
        message: "Curso creado exitosamente",
      });
    } else {
      return res.status(200).json({ message: "No se pudo crear el curso" });
    }
  } catch (error) {
    console.error("Error al crear curso:", error);
    return res.status(500).json({
      message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
    });
  }
};

const mostrarCursos = async (req, res) => {
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarcursos()`);
    return res.status(200).json(respuesta[0]);
  } catch (error) {
    console.error("Error al mostrar cursos:", error);
    return res.status(500).json({
      message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
    });
  }
};

const mostrarCursosFree = async (req, res) => {
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarcursos()`);
    return res.status(200).json(respuesta[0]);
  } catch (error) {
    console.error("Error al mostrar cursos:", error);
    return res.status(500).json({
      message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
    });
  }
};

const mostrarCurso = async (req, res)=>{
  const id = req.params['id'];
  try {
    const respuesta = await conexion.query(`CALL sp_mostrarcurso(${id})`);
    return res.status(200).json(respuesta[0]);
  } catch (error) {
    console.error("Error al mostrar cursos:", error);
    return res.status(500).json({
      message: "Error en el servidor, por favor inténtalo de nuevo más tarde",
    });
  }
}

const eliminarCurso = async (req, res) => {
  const id = req.params.id;
  try {
    const respuesta = await conexion.query(`CALL sp_eliminarcurso(${id})`);
    if (respuesta[0].affectedRows === 1) {
      return res
        .status(200)
        .json({ message: "Curso eliminado exitosamente" });
    } else {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
  } catch (err) {
    console.error("Error al eliminar el curso:", err);
    return res
      .status(500)
      .json({
        message: "Error en el servidor, por favor intentalo de nuevo más tarde",
      });
  }
};

export { insertarCurso, upload, mostrarCursos, mostrarCursosFree, mostrarCurso , eliminarCurso};
