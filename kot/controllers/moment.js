const MomentDB = require("../models/moment");
const UserDB = require("../models/user");

exports.createMoment = async (req, res) => {
  try {
    const { title, comment, tags } = req.body;
    // const { filename } = req.file;
    console.log(req.file, ">?>?>?>?>?>?>?");

    const { filename } = req.file[0];
    const userId = req.user;

    const checkUser = await UserDB.findOne({ _id: req.user });

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "invalid token",
        data: {},
      });
    }

    if (title == "" || comment == "" || userId == "") {
      return res.status(400).json({
        success: false,
        message: "please provide all field",
        data: {},
      });
    }

    const addMomentData = await MomentDB.create({
      title,
      comment,
      tags,
      userId,
      file: filename,
    });

    if (!addMomentData) {
      return res.status(400).json({
        success: false,
        message: "something went wrong",
        data: {},
      });
    }

    res.status(201).json({
      success: true,
      message: "moment added successfully",
      data: addMomentData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMoment = async (req, res) => {
  try {
    const checkUser = req.user;
    const moment_id = req.body.moment_id;

    if (!checkUser || !moment_id) {
      res.status(404).json({ status: false, message: "no user or moment id" });
    }

    const userCheck = await UserDB.findOne({ _id: checkUser });

    if (!userCheck) {
      return res.status(404).json({ status: false, message: "something went wrong" });
    }

    const deleteMomentData = await MomentDB.findByIdAndDelete(moment_id);

    if (!deleteMomentData) {
      return res.send("something went wrong");
    }

    res.status(200).json({
      success: true,
      message: "deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
