const Category = require('../models/category');
const User = require('../models/user');

/**
 * 
 * User
 */

const nameExists = async(name = '') => {
    const existsName = await User.findOne({ name });

    if(existsName) {
        throw new Error(`El nombre: ${ name }, ya está registrado`);
    }
}

const existsUserForId = async(id) => {
    const existsUser = await User.findById(id);

    if(!existsUser) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * 
 * Category
 */
const existsCategoryForId = async(id) => {
    const existsCategory = await Category.findById(id);

    if(!existsCategory) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    nameExists,
    existsUserForId,
    existsCategoryForId
}