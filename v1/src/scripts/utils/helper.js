const JWT = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return JWT.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "4w",
  });
};
const generateRefreshToken = (user) => {
  return JWT.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY);
};

module.exports = { generateAccessToken, generateRefreshToken };
