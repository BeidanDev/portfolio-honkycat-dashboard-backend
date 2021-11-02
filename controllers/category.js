const { request, response } = require('express');

const Category = require('../models/category');

const createCategory = async(req = request, res = response) => {
    try {
        const { name } = req.body;

        const data = {
            name,
            user: req.user._id
        }

        const category = new Category(data);

        await category.save();

        res.status(201).json({
            ok: true,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const listCategory = async(req = request, res = response) => {
    try {
        const category = await Category.find()
                                .populate('user', 'name');

        res.status(201).json({
            ok: true,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const listOneCategory = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id)
                                        .populate('user', 'name');

        res.status(201).json({
            ok: true,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const updateCategory = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { user, ...data } = req.body;

        data.user = req.user._id;

        const category = await Category.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json({
            ok: true,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el programador'
        });
    }
}

const deleteCategory = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const categoryDelete = await Category.findByIdAndDelete(id, { new: true });

        res.status(201).json({
            ok: true,
            categoryDelete
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
    createCategory,
    listCategory,
    listOneCategory,
    updateCategory,
    deleteCategory
}