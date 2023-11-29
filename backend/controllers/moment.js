const MomentDB = require("../models/moment");
const UserDB = require("../models/user");
const fs = require("fs");

exports.createMoment = async (req, res) => {
  try {
    const { title, comment, tags } = req.body;
    let files = req.files;
    console.log(req.files, ":>?>?mmmmmmmmmmmmdmmmmmmmmmmmmmm");

    if (!files.length) {
      throw new Error("please add one or more image");
    }

    files = files.map((d) => d.filename);

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
      files,
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

    deleteMomentData.files.map((items) => {
      fs.unlink(`./uploads/${items}`, (err) => {
        if (err && err.errno == -4058) {
          console.log({
            message: "no such file or directory",
            path: err.path.replaceAll("\\", "/"),
          });
        } else if (err) {
          console.log({ error: err });
        }
      });
    });

    res.status(200).json({
      success: true,
      message: "deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
