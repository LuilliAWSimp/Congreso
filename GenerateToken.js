const jwt = require("jsonwebtoken");

// Datos del payload
const payload = {
  id: "64abcdef1234567890abcdef", // Reemplaza con un ID real de un usuario existente
  tipo: "admin", // Asegúrate de usar "admin" para pruebas con permisos completos
};

// Clave secreta (debe coincidir con tu `.env`)
const secret = "password"; // Asegúrate de que sea idéntica al JWT_SECRET de tu proyecto

// Generar el token
const token = jwt.sign(payload, secret, { expiresIn: "1h" }); // Token válido por 1 hora
console.log("Token generado:", token);
