const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el esquema del documento
const documentSchema = new Schema(
  {
    nombre: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date },
    departamento: { type: String, required: true },
    visibilidad: {
      type: String,
      enum: ["público", "privado", "restringido"],
      default: "público",
    },
    modificadoPor: { type: String }, // String para almacenar quién modificó
    tipo: { type: String, required: true },
    rutaArchivo: { type: String, required: true },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
