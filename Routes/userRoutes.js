// routes/userRoutes.js

const express = require("express");
const User = require("../mongo_models/User");
const { auth, isAdmin } = require("../middleware/auth"); // Importamos el middleware de autenticación
const router = express.Router();

// Crear un nuevo usuario (solo puede hacerlo un admin)
router.post("/users", auth, isAdmin, async (req, res) => {
  try {
    const { nombre, username, password, departamento, tipo, email } = req.body;

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado." });
    }

    // Crear el usuario
    const user = new User({
      nombre,
      username,
      password,
      departamento,
      tipo,
      email,
    });

    // Guardar el usuario en la base de datos
    await user.save();
    res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: user });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

// Consultar todos los usuarios (solo puede hacerlo un admin)
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// Actualizar un usuario por su id (solo puede hacerlo un admin)
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { nombre, username, password, departamento, tipo, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { nombre, username, password, departamento, tipo, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario actualizado exitosamente", usuario: updatedUser });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// Eliminar un usuario por su id (solo puede hacerlo un admin)
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario eliminado exitosamente", usuario: deletedUser });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find(); // Traer todos los usuarios
    res.status(200).json(users); // Responder con los datos
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

const bcrypt = require("bcrypt");

router.post("/createadmin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10); // Contraseña: admin123
    const newAdmin = new User({
      nombre: "Admin Temporal",
      username: "admin_temp",
      password: hashedPassword,
      departamento: "Administración",
      tipo: "administrador",
      email: "admin_temp@empresa.com",
    });

    await newAdmin.save();
    res.status(201).json({ mensaje: "Administrador creado exitosamente", usuario: newAdmin });
  } catch (error) {
    console.error("Error al crear administrador:", error);
    res.status(500).json({ error: "Error al crear administrador" });
  }
});


module.exports = router;
