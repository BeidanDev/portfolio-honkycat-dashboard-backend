const { request, response } = require('express');

const validateFileUpload = (req = request, res = response, next) => {
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validateFileUpload'
        });
    }

    next();
}

module.exports = {
    validateFileUpload
}