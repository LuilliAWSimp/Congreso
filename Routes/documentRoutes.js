const express = require('express');
const router = express.Router();
const { crearDocumento, obtenerDocumentos, actualizarDocumento, eliminarDocumento } = require('../controllers/documentController');

router.post('/documentos', crearDocumento);
router.get('/documentos', obtenerDocumentos);
router.put('/documentos/:id', actualizarDocumento);
router.delete('/documentos/:id', eliminarDocumento);

module.exports = router;