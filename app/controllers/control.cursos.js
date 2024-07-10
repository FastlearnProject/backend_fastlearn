import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import conexion from "../config/db.config.js";
import { config } from "dotenv";
config();

// Configurar Azure Blob Storage
const connectionString = process.env.AZUREBLOB
const containerName = process.env.AZURE_CONTAINER;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Crear el contenedor si no existe
const createContainerIfNotExists = async () => {
  try {
    await containerClient.createIfNotExists();
    console.log(`El contenedor "${containerName}" ha sido creado o ya existía.`);
  } catch (error) {
    console.error('Error al crear el contenedor:', error.message);
    throw error;
  }
};

// Configurar multer para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Función para subir imagen a Azure Blob Storage
const uploadImageToBlobStorage = async (imageBuffer, imageName) => {
  await createContainerIfNotExists();
  const blockBlobClient = containerClient.getBlockBlobClient(imageName);

  try {
    const uploadBlobResponse = await blockBlobClient.uploadData(imageBuffer);
    console.log(`Imagen ${imageName} subida a Azure Blob Storage`);
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error al subir la imagen a Azure Blob Storage:', error.message);
    throw error;
  }
};

// Controlador para insertar curso
const insertarCurso = async (req, res) => {
  const { video, titulo, descripcion, linkCurso, tagsCurso, categoria } = req.body;
  const imagen = req.file;

  if (!imagen) {
    return res.status(400).json({ message: "La imagen es requerida" });
  }

  const imageName = imagen.originalname;

  try {
    const imageUrl = await uploadImageToBlobStorage(imagen.buffer, imageName);
    const respuesta = await conexion.query(
      `CALL sp_insertarcurso('${imageUrl}','${video}','${titulo}', '${descripcion}', '${linkCurso}', '${tagsCurso}', '${categoria}')`
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

export { insertarCurso, upload, mostrarCursos, mostrarCursosFree };
