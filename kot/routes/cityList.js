const Router = require("express").Router();
const { cityList } = require("../controllers/cityList");

Router.route("/city-list").get(cityList);

module.exports = Router;
