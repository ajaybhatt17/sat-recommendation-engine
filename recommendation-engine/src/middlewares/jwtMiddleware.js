let jwt = require('jsonwebtoken');
const jwtSecret = 'Mera Balam Thanedar Chalave Gypsy'; // lol, change this
// require("dotenv").config();

let checkToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('token:', token); // Express headers are auto converted to lowercase
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.jwtDecoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

module.exports = { checkToken };
