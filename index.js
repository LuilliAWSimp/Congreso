require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const documentRoutes = require("./Routes/documentRoutes");
const departmentRoutes = require("./Routes/departmentRoutes");
const authRoutes = require("./Routes/authRoutes"); // Importamos las rutas de autenticación
const cors = require("cors");
const path = require('path');


const app = express();
app.use(express.json()); // Para procesar JSON en las peticiones
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

app.use(cors());

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("Sistema de Control Documental Backend");
});

// Rutas
app.use("/api", userRoutes);
app.use("/api", documentRoutes);
app.use("/api", departmentRoutes);
app.use("/api/auth", authRoutes); // Usamos las rutas de autenticación
// Servir archivos estáticos (si tienes archivos subidos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});