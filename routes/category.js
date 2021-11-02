const { Router } = require('express');
const { check } = require('express-validator');

const { createCategory, listCategory, listOneCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { existsCategoryForId } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(validateJWT);

router.get('/', listCategory);

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existsCategoryForId),
    validateFields
], listOneCategory);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existsCategoryForId),
    validateFields
], updateCategory);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existsCategoryForId),
    validateFields
], deleteCategory);

module.exports = router;