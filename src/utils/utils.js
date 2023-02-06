const ERRORS = require("../constants/error");
const {AppError} = require('./custom-error')

exports.validate = async (schema, data) => {
  try {
    await schema.validateAsync(data, {
      abortEarly: false
    });

  } catch (error) {
    error = error.details?.map((err) => err.message).join(" ; ");
    throw new AppError({...ERRORS.VALIDATION_ERROR,error});
  }
};
