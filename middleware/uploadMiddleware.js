const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Obtener el nombre de archivo desde el cuerpo o usar el original
    const customName = req.body.nombre ? req.body.nombre : file.originalname;
    
    // Asegúrate de que el nombre tenga la extensión adecuada
    const fileExtension = path.extname(file.originalname); // Obtener la extensión del archivo original
    const finalName = customName.endsWith(fileExtension) ? customName : `${customName}${fileExtension}`; // Agregar extensión si no está

    cb(null, finalName);
  },
});

// Exportar middleware de Multer configurado
const upload = multer({ storage });

module.exports = upload;