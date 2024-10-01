const Document = require('../mongo_models/Documents');

// Crear nuevo documento
const crearDocumento = async (req, res) => {
  try {
    const { nombre, departamento, visibilidad } = req.body;
    const nuevoDocumento = new Document({ nombre, departamento, visibilidad });
    await nuevoDocumento.save();
    res.status(201).json({ message: "Documento creado correctamente", documento: nuevoDocumento });
  } catch (error) {
    res.status(500).json({ message: "Error al crear documento", error });
  }
};

// Obtener lista de documentos
const obtenerDocumentos = async (req, res) => {
  try {
    const documentos = await Document.find();
    res.status(200).json(documentos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener documentos", error });
  }
};

// Actualizar un documento
const actualizarDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const documentoActualizado = await Document.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Documento actualizado correctamente", documento: documentoActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar documento", error });
  }
};

// Eliminar un documento
const eliminarDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    res.status(200).json({ message: "Documento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar documento", error });
  }
};

module.exports = {
  crearDocumento,
  obtenerDocumentos,
  actualizarDocumento,
  eliminarDocumento
};
