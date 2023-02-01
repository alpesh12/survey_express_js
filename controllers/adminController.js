const bcrypt = require("bcryptjs");
const { Admin } = require('../database/models');
const jwt = require("jsonwebtoken");
const constant = require('../constant');

exports.register = async (request, response) => {

  let { firstName, lastName, email, password, gender } = request.body;

  if (!firstName || !lastName || !email || !password || !gender) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  let user = await Admin.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    password: bcrypt.hashSync(password, 8)
  });

  let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // 24 hours
  });
  delete user.password;
  return response.json({
    status: true,
    data: {
      user: user,
      token: token,
      message: constant.userRegister
    }
  });
};

exports.login = async (request, response) => {

  let { email, password } = request.body;

  if (!email || !password) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  let user = await Admin.findOne({
    where: {
      email: email
    }
  });
  if (!user) {
    return response.status(401).send({
      status: false,
      data: {
        message: constant.userNotExist
      }
    });
  }

  let passwordIsValid = bcrypt.compareSync(
    password,
    user.password
  );

  if (!passwordIsValid) {
    return response.status(401).send({
      status: false,
      data: {
        message: constant.invalidPassword
      }
    });
  }

  let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // 24 hours
  });
  delete user.password;

  return response.json({
    status: true,
    data: {
      user: user,
      token: token,
      message: constant.userLogin
    }
  });
};