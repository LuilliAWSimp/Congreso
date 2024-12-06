const jwt = require("jsonwebtoken");

// Middleware para verificar si el usuario tiene un token válido
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado. No se proporcionó token." });
  }

  // Extraemos el token del encabezado Authorization
  const token = authHeader.split(" ")[1]; // Divide "Bearer <token>" y toma la segunda parte

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token malformado." });
  }

  try {
    // Verificamos el token y decodificamos la información
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos la información decodificada en `req.user`
    next(); // Pasamos al siguiente middleware o ruta
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(400).json({ error: "Token no válido." });
  }
};

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  const user = req.user; // `req.user` debe haber sido configurado por el middleware `auth`
  if (user && user.tipo === "administrador") {
    next(); // Si el usuario es administrador, continúa
  } else {
    res.status(403).json({ error: "Acceso denegado: no tienes permisos de administrador." });
  }
};

module.exports = { auth, isAdmin };
