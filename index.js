require("dotenv").config();
const express = require("express");
const mongoURI = process.env.MONGODB_URI; // Obtener la URI desde las variables de entorno
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const documentRoutes = require("./Routes/documentRoutes");
const departmentRoutes = require("./Routes/departmentRoutes"); // Importar rutas de departamentos

const app = express();
app.use(express.json()); // Para procesar JSON en las peticiones

// Conectar a MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Local"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("Sistema de Control Documental Backend");
});

// Rutas
app.use("/api", userRoutes);
app.use("/api", documentRoutes);
app.use("/api", departmentRoutes); // Usar rutas de departamentos

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
