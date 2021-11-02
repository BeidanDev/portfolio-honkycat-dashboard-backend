const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const login = async(req = request, res = response) => {
    const { name, password } = req.body;

    try {
        // Verificar si el nombre existe
        const user = await User.findOne({ name });

        if(!user) {
            return res.status(400).json({
                msg: 'El usuario no es correcto'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña no es correcta'
            });
        }
        // Generar el JWT
        const token = await generateJWT(user.id);

        res.status(201).json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el programador'
        });
    }
}

module.exports = {
    login
}