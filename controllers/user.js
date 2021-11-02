const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const createUser = async(req = request, res = response) => {
    try {
        const { name, password } = req.body;
        const user = new User({ name, password });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const updateUser = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id, password, ...resto } = req.body;

        if(password) {
            const salt = bcryptjs.genSaltSync();

            resto.password = bcryptjs.hashSync(password, salt);
        }

        const userUpdated = await User.findByIdAndUpdate(id, resto, { new: true });

        res.status(201).json({
            ok: true,
            user: userUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const listUser = async(req = request, res = response) => {
    try {
        const user = await User.find();

        res.status(201).json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const listOneUser = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(201).json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const deleteUser = async(req = request, res = response) => {
    try {
        const { id } = req.params;

        const userDelete = await User.findByIdAndDelete(id, { new: true });

        res.status(201).json({
            ok: true,
            userDelete
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

module.exports = {
    createUser,
    updateUser,
    listUser,
    listOneUser,
    deleteUser
}