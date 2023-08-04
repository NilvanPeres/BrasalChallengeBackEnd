const { body, param } = require('express-validator');

const userValidation = {
    createUser: [
        body('username').isString().withMessage('Username deve ser string'),
        body('password').isString().withMessage('Password deve ser string').isLength({ min: 6 }).withMessage('Password deve ter no mínimo 6 caracteres'),
        body('email').isEmail().withMessage('Email deve ter um domínio válido')
    ],
    getUser: [
        param('id').isMongoId().withMessage('id deve ser MongoDB ObjectId válido')
    ],
    updateUser: [
        param('id').isMongoId().withMessage('id deve ser MongoDB ObjectId válido'),
        body('username').optional().isString().withMessage('Username deve ser string'),
        body('password').optional().isString().withMessage('Password deve ser string').isLength({ min: 6 }).withMessage('Password deve ter no mínimo 6 caracteres'),
        body('email').optional().isEmail().withMessage('Email deve ter um domínio válido')
    ],
    deleteUser: [
        param('id').isMongoId().withMessage('id deve ser MongoDB ObjectId válido')
    ]
};

module.exports = userValidation;
