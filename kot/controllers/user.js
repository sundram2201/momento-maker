const UserDB = require("../models/user");
const MomentDB = require("../models/moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET || "abc";

exports.createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      mobile_no_pre,
      mobile_no,
      email,
      city,
      password,
    } = req.body;

    const existingUser = await UserDB.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserDB({
      first_name,
      last_name,
      mobile_no_pre,
      mobile_no,
      email,
      city,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserDB.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        success: true,
        message: "login successfully",
        data: user,
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.momentList = async (req, res) => {
  try {
    const userId = req.user;

    const checkUser = await UserDB.findOne({ _id: userId });

    if (!checkUser) {
      res.status(404).json({ status: false, message: "invalid user" });
    }

    // `${req.protocol}://${req.get("host")}/profile/${finalData?.image?.split("\\")[1]}`
    let message = `${req.protocol}:${req.get("host")}/uploads/`;
    console.log({ message });

    const momentList = await MomentDB.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          comment: 1,
          tags: 1,
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          file: {
            $concat: [message, "$file"],
          },
        },
      },
    ]);
    // ({ userId }).sort({
    //   createdAt: -1,
    // });

    // const momentList = await MomentDB.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      data: momentList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
