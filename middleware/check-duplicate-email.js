const { Admin } = require('../database/models');
const constant = require('../constant');

module.exports = async (req, res, next) => {

  let admin = await Admin.findAll({
    where: {
      email: req.body.email
    }
  });
  if (admin.length) {
    return res.status(401).send({
      status: false,
      data: {
        message: constant.userExist
      }
    });
  }
  next();
};