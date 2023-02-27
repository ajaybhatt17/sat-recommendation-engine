// this is to create routing for your endpoint
const express = require('express');
// const { checkToken } = require('../middlewares/jwtMiddleware');

const { saveRecommendation } = require('../controllers/default_controller')();
const routes = function () {
  const apiRoute = express.Router();

  // open apis without auth
  apiRoute.route('/recommendation').post(saveRecommendation);

  // auth starts from here
//   apiRoute.use(checkToken);

  return apiRoute;
};

module.exports = routes;
