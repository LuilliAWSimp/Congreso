const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); // Middleware para subir archivos
const Document = require("../mongo_models/Documents");
const path = require("path");
const fs = require("fs");

// Ruta para obtener y servir archivos desde la carpeta uploads
router.get("/archivo/:nombre", (req, res) => {
  const nombreArchivo = req.params.nombre;

  // Construir la ruta completa del archivo
  const rutaArchivo = path.join(__dirname, "../uploads", nombreArchivo);

  // Enviar el archivo al cliente
  res.sendFile(rutaArchivo, (err) => {
    if (err) {
      console.error("Error al enviar el archivo:", err);
      res.status(404).json({ mensaje: "Archivo no encontrado" });
    }
  });
});

// Ruta para listar todos los archivos
router.get("/archivos", (req, res) => {
  const rutaCarpeta = path.join(__dirname, "../uploads");

  // Leer el contenido de la carpeta uploads
  fs.readdir(rutaCarpeta, (err, archivos) => {
    if (err) {
      console.error("Error al leer la carpeta de archivos:", err);
      return res.status(500).json({ mensaje: "Error al leer los archivos" });
    }

    // Devolver una lista con los nombres de los archivos
    res.status(200).json({
      mensaje: "Archivos disponibles:",
      archivos,
    });
  });
});


// Ruta para subir documentos
router.post("/upload", upload.single("archivo"), async (req, res) => {
  try {
    const { nombre, departamento, visibilidad} = req.body;

    const nuevoDocumento = new Document({
      nombre: nombre || req.file.originalname, // Usa el nombre proporcionado o el nombre del archivo
      departamento,
      visibilidad,
      tipo: req.file.mimetype,
      rutaArchivo: req.file.path,
    });

    await nuevoDocumento.save();
    res.status(201).json({ mensaje: "Documento subido con éxito", documento: nuevoDocumento });
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).json({ mensaje: "Error al subir el archivo" });
  }
});

// Ruta para editar documentos
router.put("/edit/:id", async (req, res) => {
  try {
    const { nombre, departamento, visibilidad, modificadoPor } = req.body;

    const documentoActualizado = await Document.findByIdAndUpdate(
      req.params.id,
      { nombre, departamento, visibilidad, modificadoPor, fechaModificacion: new Date() },
      { new: true }
    );

    if (!documentoActualizado) {
      return res.status(404).json({ mensaje: "Documento no encontrado" });
    }

    res.status(200).json({ mensaje: "Documento actualizado con éxito", documento: documentoActualizado });
  } catch (error) {
    console.error("Error al actualizar el documento:", error);
    res.status(500).json({ mensaje: "Error al actualizar el documento" });
  }
});

// Ruta para eliminar documentos
router.delete("/delete/:id", async (req, res) => {
  try {
    const documento = await Document.findById(req.params.id);

    if (!documento) {
      return res.status(404).json({ mensaje: "Documento no encontrado" });
    }

    // Eliminar el archivo del sistema
    fs.unlinkSync(documento.rutaArchivo);

    // Eliminar el registro del documento
    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({ mensaje: "Documento eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
    res.status(500).json({ mensaje: "Error al eliminar el documento" });
  }
});

module.exports = router;
