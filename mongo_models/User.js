// mongo_models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el esquema del usuario
const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
    departamento: { type: String, required: true },
  },
  {
    timestamps: true, // Agrega fechas de creación y actualización automáticamente
  }
);

// Crear el modelo del usuario
const User = mongoose.model("User", userSchema);

module.exports = User;
