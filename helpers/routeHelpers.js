const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json({success: false, data: result.error});
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      fname:Joi.string(),
      lname: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
}