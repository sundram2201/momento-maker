const Router = require("express").Router();
const { createUser, loginUser, momentList, getUserDetails } = require("../controllers/user");
const { verifyToken } = require("../middleware/jwtCheck");

Router.route("/register-user").post(createUser);
Router.route("/login-user").post(loginUser);
Router.route("/get-user").get(verifyToken, getUserDetails);
Router.route("/moment-list").get(verifyToken, momentList);

module.exports = Router;
