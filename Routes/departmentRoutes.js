// Routes/departmentRoutes.js
const express = require('express');
const Department = require('../mongo_models/Department');
const router = express.Router();

// Ruta para crear un nuevo departamento
router.post('/departments', async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener todos los departamentos
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
