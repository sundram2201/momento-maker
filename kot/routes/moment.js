const Router = require("express").Router();

const { createMoment, deleteMoment } = require("../controllers/moment");
const { verifyToken } = require("../middleware/jwtCheck");

const { uploadFile } = require("../helper/multerUpload");

Router.route("/create-moment").post(
  verifyToken,
  uploadFile.single("file"),
  createMoment
);
Router.route("/delete-moment").put(verifyToken, deleteMoment);

module.exports = Router;
