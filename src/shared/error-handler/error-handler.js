// basic error handler which will not expose any stack traces/secrets
// and will return the correct responses when invalid params from validator
export const errorHandler = (error) => {
  let body = "An error has occurred";
  let statusCode = 500;

  const errorType = error && error.errorType ? error.errorType : 2;

  switch (errorType) {
    case 1:
      body = "Forbidden";
      statusCode = 403;
      break;
    case 2:
    case 3:
      break;
    case 4:
    case 5:
      body = { message: error.userMessage };
      statusCode = 400;
      break;
    case 6:
      body = "Not Found";
      statusCode = 404;
      break;
    case 7:
      body = "Unauthorised";
      statusCode = 401;
      break;
    default:
      break;
  }

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body, null, 2),
  };
};
