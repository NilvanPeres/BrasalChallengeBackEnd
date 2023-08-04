const { body, param } = require('express-validator');

const taskValidation = {
    createTask: [
        body('body').isString().withMessage('Body dever ser uma string'),
        body('status').isIn(['TODO', 'DONE']).withMessage('Status deve ser TODO ou DONE'),
    ],
    getTaskById: [
        param('id').isMongoId().withMessage('id deve ser MongoDB ObjectId válido')
    ],
    updateTask: [
        param('id').isMongoId().withMessage('id deve ser MongoDB ObjectId válido'),
        body('body').optional().isString().withMessage('Body dever ser uma string'),
        body('status').optional().isIn(['TODO', 'DONE']).withMessage('Status deve ser TODO ou DONE'),
    ],
    deleteTask: [
        param('id').isMongoId().withMessage('id deve ser MongoDB ObjectId válido')
    ]
};

module.exports = taskValidation;