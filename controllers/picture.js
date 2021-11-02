const { request, response } = require('express');

const { Picture } = require('../models/picture');

const createPicture = async(req = request, res = response) => {
    try {
        const { user, ...body } = req.body;

        const data = {
            ...body,
            user: req.user._id
        }

        const picture = new Picture(data);

        await picture.save();

        res.status(201).json({
            ok: true,
            picture
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const listPicture = async(req = request, res = response) => {
    try {
        const picture = await Picture.find()
                                        .populate('category', 'name')
                                        .populate('user', 'name');

        res.status(201).json({
            ok: true,
            picture
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const listOnePicture = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const picture = await Picture.findById(id)
                                        .populate('category', 'name')
                                        .populate('user', 'name');

        res.status(201).json({
            ok: true,
            picture
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const updatePicture = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { user, ...data } = req.body;

        data.user = req.user._id;

        const picture = await Picture.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json({
            ok: true,
            picture
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const deletePicture = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const pictureDelete = await Picture.findByIdAndDelete(id, { new: true });

        res.status(201).json({
            ok: true,
            pictureDelete
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
    createPicture,
    listPicture,
    listOnePicture,
    updatePicture,
    deletePicture
}