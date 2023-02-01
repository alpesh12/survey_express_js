const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      status: false,
      data: {
        message: "No token provided!"
      }
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: false,
        data: {
          message: "Unauthorized!"
        }
      });
    }
    req.adminId = decoded.id;
    next();
  });
};