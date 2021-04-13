const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

const validatePagination = (req, res, next) => {
  const { limit = 3, from = 0 } = req.query;

  if (isNaN(Number(limit)) || isNaN(Number(from))) {
    return res.status(203).json({ error: 'The query type must be a number }' });
  }

  next();
};

module.exports = {
  validateFields,
  validatePagination,
};
