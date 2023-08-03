const { body, param } = require('express-validator');

const userValidation = {
    createUser: [
        body('username').isString().withMessage('Username must be a string'),
        body('password').isString().withMessage('Password must be a string'),
        body('email').isEmail().withMessage('Email must be a valid email address')
    ],
    getUser: [
        param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId')
    ],
    updateUser: [
        param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId'),
        body('username').optional().isString().withMessage('Username must be a string'),
        body('password').optional().isString().withMessage('Password must be a string'),
        body('email').optional().isEmail().withMessage('Email must be a valid email address')
    ],
    deleteUser: [
        param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId')
    ]
};

module.exports = userValidation;
