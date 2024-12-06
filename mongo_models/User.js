//User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Aseguramos que el nombre de usuario sea único
  },
  password: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"], // Campo obligatorio
    unique: true, // Aseguramos que el correo electrónico sea único
    lowercase: true, // Convertir todo el email a minúsculas
    trim: true, // Eliminar espacios innecesarios alrededor del email
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
