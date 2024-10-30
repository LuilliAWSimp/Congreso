const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Document = require("../mongo_models/Documents");

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Verificar si el usuario ha proporcionado un nombre para el archivo
    let originalname = req.body.nombre || file.originalname;
    
    // Si el nombre ya tiene una extensión, no la añadimos de nuevo
    if (path.extname(originalname) === "") {
      originalname += path.extname(file.originalname); // Añadir la extensión original del archivo
    }

    // Guardar el archivo con el nombre proporcionado sin añadir números
    cb(null, originalname);
  }
});

// Crear el middleware de Multer con la configuración de almacenamiento
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|xls|xlsx|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("El archivo no es un tipo válido. Solo se permiten PDF, Excel y Word."));
  }
});

// Ruta para la subida de documentos
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Crear un nuevo documento con los datos proporcionados
    const nuevoDocumento = new Document({
      nombre: req.body.nombre || req.file.originalname, // Nombre proporcionado o nombre original del archivo
      departamento: req.body.departamento,
      visibilidad: req.body.visibilidad,
      creadoPor: req.body.creadoPor, // Debes asegurarte de pasar el ID correcto del usuario
      tipo: req.file.mimetype,
      rutaArchivo: req.file.path
    });

    // Guardar el documento en la base de datos
    const documentoGuardado = await nuevoDocumento.save();

    res.status(201).json(documentoGuardado);
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).json({ error: "Error al subir el archivo" });
  }
});

module.exports = router;
