const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el esquema del documento
const documentSchema = new Schema(
  {
    nombre: { type: String, required: true }, // Nombre del archivo subido
    fechaCreacion: { type: Date, default: Date.now }, // Fecha en la que fue creado
    fechaModificacion: { type: Date }, // Fecha de última modificación
    departamento: { type: String, required: true }, // Departamento al que pertenece
    visibilidad: { 
      type: String, 
      enum: ["público", "privado", "restringido"], 
      default: "público" 
    }, // Nivel de visibilidad del documento
    creadoPor: { type: Schema.Types.ObjectId, ref: 'User' }, // Referencia al usuario que creó el documento
    modificadoPor: { type: Schema.Types.ObjectId, ref: 'User' }, // Referencia al usuario que lo modificó
    tipo: { type: String, required: true }, // Tipo de archivo (por ejemplo, 'pdf', 'excel')
    rutaArchivo: { type: String, required: true } // Ruta donde se almacena el archivo en el servidor
  },
  {
    timestamps: true, // Agrega automáticamente fechas de creación y modificación
  }
);

// Crear el modelo del documento
const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
