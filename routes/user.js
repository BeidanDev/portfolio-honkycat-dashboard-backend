const { Router } = require('express');
const { check } = require('express-validator');

const { listUser, createUser, updateUser, deleteUser, listOneUser } = require('../controllers/user');
const { nameExists, existsUserForId } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', listUser);

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existsUserForId),
    validateFields
], listOneUser);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 caracteres').isLength({ min: 6 }),
    check('name').custom(nameExists),
    validateFields
], createUser);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserForId),
    validateFields
], updateUser);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserForId),
    validateFields
], deleteUser);

module.exports = router;