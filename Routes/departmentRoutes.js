const express = require("express");
const router = express.Router();
const Department = require("../mongo_models/Department"); // Modelo de departamento

// Obtener todos los departamentos
router.get("/departments", async (req, res) => {
  try {
    const departamentos = await Department.find();
    if (departamentos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron departamentos" });
    }
    res.status(200).json(departamentos);
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    res.status(500).json({ mensaje: "Error al obtener departamentos" });
  }
});

// Crear un nuevo departamento
router.post("/departments", async (req, res) => {
  const { nombre } = req.body;
  try {
    // Verificar que el campo nombre no esté vacío
    if (!nombre) {
      return res.status(400).json({ mensaje: "El nombre del departamento es obligatorio" });
    }

    // Crear el nuevo departamento
    const nuevoDepartamento = new Department({ nombre });
    await nuevoDepartamento.save();
    res.status(201).json({ mensaje: "Departamento creado con éxito", departamento: nuevoDepartamento });
  } catch (error) {
    console.error("Error al crear departamento:", error);

    // Manejo específico de errores de unicidad
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: "El nombre del departamento ya existe" });
    }

    res.status(500).json({ mensaje: "Error al crear el departamento" });
  }
});

// Actualizar un departamento por ID
router.put("/departments/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    if (!nombre) {
      return res.status(400).json({ mensaje: "El nombre del departamento es obligatorio" });
    }

    const departamentoActualizado = await Department.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );
    if (!departamentoActualizado) {
      return res.status(404).json({ mensaje: "Departamento no encontrado" });
    }
    res.status(200).json({ mensaje: "Departamento actualizado", departamento: departamentoActualizado });
  } catch (error) {
    console.error("Error al actualizar el departamento:", error);
    res.status(500).json({ mensaje: "Error al actualizar el departamento" });
  }
});

// Eliminar un departamento por ID
router.delete("/departments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const departamentoEliminado = await Department.findByIdAndDelete(id);
    if (!departamentoEliminado) {
      return res.status(404).json({ mensaje: "Departamento no encontrado" });
    }
    res.status(200).json({ mensaje: "Departamento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el departamento:", error);
    res.status(500).json({ mensaje: "Error al eliminar el departamento" });
  }
});

module.exports = router;
