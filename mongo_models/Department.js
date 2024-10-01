const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el esquema del departamento
const departmentSchema = new Schema({
  nombre: { type: String, required: true },
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
