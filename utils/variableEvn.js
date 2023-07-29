const secretJwt = (process.env.NODE_ENV !== 'production') ? 'SECRET' : process.env.JWT_SECRET;

module.exports = {
  secretJwt,
};
