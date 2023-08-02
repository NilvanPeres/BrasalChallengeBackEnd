const { body, param } = require('express-validator');

const taskValidation = {
    createTask: [
        body('body').isString().withMessage('Body must be a string'),
        body('status').isIn(['TODO', 'DONE']).withMessage('Status must be either TODO or DONE'),
        body('isCollaborative').isBoolean().withMessage('isCollaborative must be a boolean')
    ],
    getTaskById: [
        param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId')
    ],
    updateTask: [
        param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId'),
        body('body').optional().isString().withMessage('Body must be a string'),
        body('status').optional().isIn(['TODO', 'DONE']).withMessage('Status must be either TODO or DONE'),
        body('isCollaborative').optional().isBoolean().withMessage('isCollaborative must be a boolean')
    ],
    deleteTask: [
        param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId')
    ],
    updateTaskStatus: [
        param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId'),
        body('status').isIn(['TODO', 'DONE']).withMessage('Status must be either TODO or DONE')
    ]
};

module.exports = taskValidation;