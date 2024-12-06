// authRoutes.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../mongo_models/User"); // El modelo de usuario

const router = express.Router();

// Ruta para el login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario por su username o email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    // Si no se encuentra el usuario
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Crear el JWT
    const token = jwt.sign(
      {
        id: user._id,
        tipo: user.tipo, // Esto asegura que el rol del usuario esté en el token
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // El token expira en una hora
      }
    );

    // Responder con el token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

module.exports = router;
