function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}

const handleWrongJWT = () =>
  new AppError("Invalid token! Please log in again", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "production") {
    if (err.NODE_ENV) sendErrorProd(err, res);
  } else if (process.env.NODE_ENV === "development") {
    let error = err;

    if (error.name === "JsonWebTokenError") error = handleWrongJWT();

    sendErrorProd(error, res);
  }
};
