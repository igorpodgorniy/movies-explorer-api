const regExp = /^https?:\/\/(w{3}\.)?([a-zA-Z\d-]{0,60}\.)([a-zA-Z]{2,4})(\/[\w\-.~:/?#[\]@!$&'()*+,;=]#?$)?/;
const LOCAL_HOST_DB = 'mongodb://localhost:27017/moviesdb';
const LOCAL_JWT_SECRET = 'some-dev-secret-key';

module.exports = {
  regExp,
  LOCAL_HOST_DB,
  LOCAL_JWT_SECRET,
};
