const { Survey, UserSurvey } = require('../database/models');
const constant = require('../constant');

exports.create = async (request, response) => {

  let { title, questions } = request.body;

  if (!title) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  const chars = "ABCDEFfGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomArray = Array.from(
    { length: 5 },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );
  const randomString = randomArray.join("");
  let surveyId = "SUR" + randomString;

  let survey = await Survey.create({
    title: title,
    surveyId: surveyId,
    adminId: request.adminId,
    questions: questions
  }, {
    include: [{ association: "questions", include: "options" }]
  });

  if (!survey) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  return response.json({
    status: true,
    data: survey,
    message: constant.surveyCreated
  });
};

exports.get = async (request, response) => {

  let { surveyId } = request.params;

  if (!surveyId) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  let survey = await Survey.findOne({
    where: {
      id: surveyId
    },
    include: [{ association: "questions", include: "options" }]
  });

  return response.json({
    status: true,
    data: {
      survey
    }
  });
};

exports.delete = async (request, response) => {

  let { surveyId } = request.params;
  if (!surveyId) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  await Survey.destroy({
    where: {
      id: surveyId
    },
    include: [{ association: "questions", include: "options" }]
  });

  await UserSurvey.destroy({
    where: {
      surveyId: surveyId
    },
    include: [{ association: "answers", include: "options" }]
  });

  return response.json({
    status: true,
    data: {
      message: constant.surveyDeleted
    }
  });
};

exports.list = async (request, response) => {

  let { page } = request.body;
  let item_per_page = 10;
  let offset = page ? item_per_page * (page - 1) : 0;

  let surveyList = await Survey.findAll({
    include: [{ association: "questions", include: "options" }],
    order: [["id", "DESC"]],
    limit: item_per_page,
    offset: offset
  });

  let total_count = await Survey.count();

  return response.json({
    status: true,
    data: {
      item_per_page: item_per_page,
      total_count: total_count,
      data: surveyList,
    }
  });
};

exports.submit = async (request, response) => {

  let { firstName, lastName, email, surveyId, answers } = request.body;

  if (!surveyId || !firstName || !lastName || !email || !answers) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  let userSurvey = await UserSurvey.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    surveyId: surveyId,
    answers: answers
  }, {
    include: [{ association: "answers", include: "options" }]
  });

  if (!userSurvey) {
    return response.status(403).send({
      status: false,
      data: {
        message: constant.serverError
      }
    });
  }

  return response.json({
    status: true,
    data: userSurvey,
    message: constant.surveyCreated
  });
}

exports.submittedSurvey = async (request, response) => {
  let { page, surveyId } = request.body;
  let item_per_page = 10;
  let offset = page ? item_per_page * (page - 1) : 0;
  let whereObj = {}
  if (surveyId) {
    whereObj.surveyId = surveyId;
  }

  let surveyList = await UserSurvey.findAll({
    where: whereObj,
    include: [{ association: "answers", include: "options" }],
    order: [["id", "DESC"]],
    limit: item_per_page,
    offset: offset
  });

  let total_count = await UserSurvey.count({
    where: whereObj
  });

  return response.json({
    status: true,
    data: {
      item_per_page: item_per_page,
      total_count: total_count,
      data: surveyList,
    }
  });
}
