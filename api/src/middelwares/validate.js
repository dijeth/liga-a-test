const { render, joiExceptionToObject } = require('../utils');

const getValidateMiddleware = (schema, template, templateData = {}) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const renderData = {
      ...templateData,
      oldData: req.body,
      errors: joiExceptionToObject(err),
    };

    render(template, renderData, req, res);
  }
};

const getApiValidateMiddleware = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({
      errors: joiExceptionToObject(err),
    });
  }
};

module.exports = {
  getValidateMiddleware,
  getApiValidateMiddleware,
};
