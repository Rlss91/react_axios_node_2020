const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return new Promise((ok, not) => {
    jwt.sign(data, process.env.TOKENKEY, { expiresIn: "10d" }, (err, token) => {
      if (err) not(err);
      else ok(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((ok, not) => {
    jwt.verify(token, process.env.TOKENKEY, (err, decoded) => {
      if (err) not(err);
      else ok(decoded);
    });
  });
};

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
