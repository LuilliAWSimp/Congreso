//controllers/userController.js
const User = require('../mongo_models/user');

// Crear nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol, departamento } = req.body;
    const nuevoUsuario = new User({ nombre, email, password, rol, departamento });
    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario creado correctamente", usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

// Obtener lista de usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioActualizado = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Usuario actualizado correctamente", usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
};
