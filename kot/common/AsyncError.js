module.exports = (AsyncFunc) => (req, res, next) => {
  return Promise.resolve(AsyncFunc(req, res, next)).catch(next);
};
