import { errorTypes, logLevels } from "./error-constants";

export class AppError extends Error {
  constructor(
    userMessage = "",
    internalMessage = "",
    errorType = errorTypes.ERROR,
    loglevel = logLevels.ERROR
  ) {
    super(internalMessage);

    this.userMessage = userMessage;
    this.internalMessage = internalMessage;
    this.errorType = errorType;
    this.loglevel = loglevel;
  }
}
