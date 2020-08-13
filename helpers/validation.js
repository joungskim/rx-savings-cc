//Validation
const Joi = require('@hapi/joi');

const getDistanceValidation = (data) => {
    const schema = Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    });

    return schema.validate(data);
}

const seederValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    })

    return schema.validate(data);
}

module.exports.getDistanceValidation = getDistanceValidation;
module.exports.seederValidation = seederValidation;