const send = (res, statusCode, message, data = null) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

const ok = (res, message, data = null) => send(res, 200, message, data);
const created = (res, message, data = null) => send(res, 201, message, data);

module.exports = {
  ok,
  created,
};
