const secretJwt = (process.env.NODE_ENV !== 'production') ? 'SECRET' : process.env.JWT_SECRET;
const dataBase = (process.env.NODE_ENV !== 'production') ? 'mongodb://127.0.0.1:27017/bitfilmsdb' : process.env.ADDRESS_DB;

module.exports = {
  secretJwt,
  dataBase,
};
