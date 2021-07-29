import Ajv from "ajv";
import { AppError } from "../errors/app-error";
import { errorTypes, logLevels } from "../errors/error-constants";

export function validate(obj, schema) {
  const ajv = new Ajv({
    allErrors: true,
  });

  const validator = ajv.compile(schema);
  const valid = validator(obj);

  if (!valid) {
    const errorMessage = `Invalid: ${ajv.errorsText(validator.errors)}`;
    console.error(errorMessage);

    throw new AppError(
      errorMessage,
      errorMessage,
      errorTypes.INVALID_PARAMETERS,
      logLevels.ERROR
    );
  }
}
