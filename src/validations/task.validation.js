const Joi = require('joi');

exports.createTask = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),

    description: Joi.string()
        .allow(null, '')
        .optional(),

    start_date: Joi.date()
        .optional(),

    end_date: Joi.date()
        .min(Joi.ref('start_date')),

    priority: Joi.string()
        .valid('low', 'medium', 'high')
        .optional()
});

exports.updateTask = Joi.object({
    title: Joi.string().min(3),

    status: Joi.string()
        .valid('pending', 'done'),

    end_date: Joi.date(),

    priority: Joi.string()
        .valid('low', 'medium', 'high')
})
.min(1); 

