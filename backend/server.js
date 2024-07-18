var $2A20x$express = require("express");
var $2A20x$cors = require("cors");
var $2A20x$cookieparser = require("cookie-parser");
var $2A20x$bcrypt = require("bcrypt");
var $2A20x$jsonwebtoken = require("jsonwebtoken");
var $2A20x$mongoose = require("mongoose");
var $2A20x$fs = require("fs");
var $2A20x$path = require("path");
var $2A20x$multer = require("multer");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

const $84a264530b3fb4fb$var$app = $2A20x$express();


var $f7c7548b1beb19bd$exports = {};

const $f7c7548b1beb19bd$var$Router = $2A20x$express.Router();
var $5ba041da1c324270$export$3493b8991d49f558;
var $5ba041da1c324270$export$692b4a7cc7a486ce;
var $5ba041da1c324270$export$6cb2b711f34c50d4;
var $5ba041da1c324270$export$714d3544202969b;
var $6f546cf3d5e6b938$exports = {};

const $6f546cf3d5e6b938$var$userSchema = $2A20x$mongoose.Schema({
    first_name: {
        type: String,
        required: [
            true,
            "first_name is required"
        ]
    },
    last_name: {
        type: String,
        required: [
            true,
            "last_name is required"
        ]
    },
    mobile_no_pre: {
        type: String,
        required: [
            true,
            "mobile_no_pre is required"
        ],
        trim: true,
        lowercase: true
    },
    mobile_no: {
        type: Number,
        required: [
            true,
            "mobile_no is required"
        ],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [
            true,
            "email is required"
        ],
        unique: true,
        trim: true,
        lowercase: true
    },
    city: {
        type: String,
        required: [
            true,
            "city is required"
        ],
        trim: true
    },
    password: {
        type: String,
        required: [
            true,
            "password is required"
        ],
        select: false
    }
}, {
    timestamps: true
});
$6f546cf3d5e6b938$exports = $2A20x$mongoose.model("users", $6f546cf3d5e6b938$var$userSchema);


var $6270bc53eea2482c$exports = {};

const { ObjectId: $6270bc53eea2482c$var$ObjectId } = $2A20x$mongoose.Schema.Types;
const $6270bc53eea2482c$var$momentSchema = new $2A20x$mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: ""
    },
    tags: [
        {
            type: String
        }
    ],
    userId: {
        type: $6270bc53eea2482c$var$ObjectId,
        ref: "user"
    },
    files: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});
$6270bc53eea2482c$exports = $2A20x$mongoose.model("moment", $6270bc53eea2482c$var$momentSchema);





var $5ba041da1c324270$require$mongoose = ($parcel$interopDefault($2A20x$mongoose));
const $5ba041da1c324270$var$JWT_SECRET = "ufEJfcQTRhO99tGB382HEK2tOe43MutOytdHkannuzA=";
$5ba041da1c324270$export$3493b8991d49f558 = async (req, res)=>{
    try {
        const { first_name: first_name, last_name: last_name, mobile_no_pre: mobile_no_pre, mobile_no: mobile_no, email: email, city: city, password: password } = req.body;
        const existingUser = await $6f546cf3d5e6b938$exports.findOne({
            email: email
        });
        if (existingUser) return res.status(400).json({
            error: "Email already in use"
        });
        const hashedPassword = await $2A20x$bcrypt.hash(password, 10);
        const newUser = new $6f546cf3d5e6b938$exports({
            first_name: first_name,
            last_name: last_name,
            mobile_no_pre: mobile_no_pre,
            mobile_no: mobile_no,
            email: email,
            city: city,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            message: "Registration successful"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
$5ba041da1c324270$export$692b4a7cc7a486ce = async (req, res)=>{
    try {
        const { email: email, password: password } = req.body;
        const user = await $6f546cf3d5e6b938$exports.findOne({
            email: email
        }).select("+password");
        if (!user) return res.status(401).json({
            error: "Invalid credentials"
        });
        const passwordMatch = await $2A20x$bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = $2A20x$jsonwebtoken.sign({
                userId: user._id,
                email: user.email
            }, $5ba041da1c324270$var$JWT_SECRET, {
                expiresIn: "1h"
            });
            return res.status(200).json({
                success: true,
                message: "login successfully",
                data: user,
                token: token
            });
        } else res.status(401).json({
            error: "Invalid credentials"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
$5ba041da1c324270$export$6cb2b711f34c50d4 = async (req, res)=>{
    try {
        const userId = req.user;
        const checkUser = await $6f546cf3d5e6b938$exports.findOne({
            _id: userId
        });
        if (!checkUser) res.status(404).json({
            status: false,
            message: "invalid user"
        });
        let message = `${req.protocol}:${req.get("host")}/uploads/`;
        const momentList = await $6270bc53eea2482c$exports.aggregate([
            {
                $match: {
                    userId: $5ba041da1c324270$require$mongoose.Types.ObjectId(userId)
                }
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
                    files: {
                        $map: {
                            input: "$files",
                            as: "files",
                            in: {
                                $concat: [
                                    message,
                                    "$$files"
                                ]
                            }
                        }
                    }
                }
            }
        ]);
        return res.status(200).json({
            success: true,
            message: "data fetched successfully",
            data: momentList
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
$5ba041da1c324270$export$714d3544202969b = async (req, res)=>{
    try {
        const user = await $6f546cf3d5e6b938$exports.findOne({
            _id: req.user
        });
        console.log(req.user);
        const userData = {
            userId: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile_no: user.mobile_no_pre + user.mobile_no
        };
        return res.status(200).json({
            message: "Data recieved successfully",
            userData: userData
        });
    } catch (err) {
        res.status(401).json({
            error: "Error getting data"
        });
    }
};


var $f7c7548b1beb19bd$require$createUser = $5ba041da1c324270$export$3493b8991d49f558;
var $f7c7548b1beb19bd$require$loginUser = $5ba041da1c324270$export$692b4a7cc7a486ce;
var $f7c7548b1beb19bd$require$momentList = $5ba041da1c324270$export$6cb2b711f34c50d4;
var $f7c7548b1beb19bd$require$getUserDetails = $5ba041da1c324270$export$714d3544202969b;
var $b3e11ae923d7236b$export$c807668e63e7354b;

const $b3e11ae923d7236b$var$JWT_SECRET = "ufEJfcQTRhO99tGB382HEK2tOe43MutOytdHkannuzA=";

$b3e11ae923d7236b$export$c807668e63e7354b = async (req, res, next)=>{
    const token = req.headers["token"];
    if (!token) return res.status(401).json({
        status: false,
        message: "No token provided"
    });
    try {
        $2A20x$jsonwebtoken.verify(token, $b3e11ae923d7236b$var$JWT_SECRET, async (err, data)=>{
            if (err) {
                console.log("errr:::::");
                res.statusCode = 401;
                return res.status(401).json({
                    status: false,
                    message: "Invalid Token"
                });
            } else {
                let resp = await $6f546cf3d5e6b938$exports.findOne({
                    _id: data.userId
                });
                if (!resp) {
                    console.log("after next");
                    res.statusCode = 401;
                    return res.status(401).json({
                        status: false,
                        message: "Session Expired"
                    });
                } else {
                    req.user = data.userId;
                    next();
                }
            }
        });
    } catch (e) {
        res.statusCode = 401;
        console.log("in catch");
        return res.status(401).json({
            status: false,
            message: "Unauthorized Access"
        });
    }
};


var $f7c7548b1beb19bd$require$verifyToken = $b3e11ae923d7236b$export$c807668e63e7354b;
$f7c7548b1beb19bd$var$Router.route("/register-user").post($f7c7548b1beb19bd$require$createUser);
$f7c7548b1beb19bd$var$Router.route("/login-user").post($f7c7548b1beb19bd$require$loginUser);
$f7c7548b1beb19bd$var$Router.route("/get-user").get($f7c7548b1beb19bd$require$verifyToken, $f7c7548b1beb19bd$require$getUserDetails);
$f7c7548b1beb19bd$var$Router.route("/moment-list").get($f7c7548b1beb19bd$require$verifyToken, $f7c7548b1beb19bd$require$momentList);
$f7c7548b1beb19bd$exports = $f7c7548b1beb19bd$var$Router;


var $131d38af0d10413c$exports = {};

const $131d38af0d10413c$var$Router = $2A20x$express.Router();
var $1bf98d4af449ae8c$export$cdb369e10877f0e4;
var $1bf98d4af449ae8c$export$8b33a51056576971;



$1bf98d4af449ae8c$export$cdb369e10877f0e4 = async (req, res)=>{
    try {
        const { title: title, comment: comment, tags: tags } = req.body;
        let files = req.files;
        // console.log(req.files, ":>?>?mmmmmmmmmmmmdmmmmmmmmmmmmmm");
        if (!files.length) throw new Error("please add one or more image");
        files = files.map((d)=>d.filename);
        const userId = req.user;
        const checkUser = await $6f546cf3d5e6b938$exports.findOne({
            _id: req.user
        });
        if (!checkUser) return res.status(401).json({
            success: false,
            message: "invalid token",
            data: {}
        });
        if (title == "" || comment == "" || userId == "") return res.status(400).json({
            success: false,
            message: "please provide all field",
            data: {}
        });
        const addMomentData = await $6270bc53eea2482c$exports.create({
            title: title,
            comment: comment,
            tags: tags,
            userId: userId,
            files: files
        });
        if (!addMomentData) return res.status(400).json({
            success: false,
            message: "something went wrong",
            data: {}
        });
        res.status(201).json({
            success: true,
            message: "moment added successfully",
            data: addMomentData
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
$1bf98d4af449ae8c$export$8b33a51056576971 = async (req, res)=>{
    try {
        const checkUser = req.user;
        const moment_id = req.body.moment_id;
        if (!checkUser || !moment_id) res.status(404).json({
            status: false,
            message: "no user or moment id"
        });
        const userCheck = await $6f546cf3d5e6b938$exports.findOne({
            _id: checkUser
        });
        if (!userCheck) return res.status(404).json({
            status: false,
            message: "something went wrong"
        });
        const deleteMomentData = await $6270bc53eea2482c$exports.findByIdAndDelete(moment_id);
        if (!deleteMomentData) return res.send("something went wrong");
        deleteMomentData.files.map((items)=>{
            $2A20x$fs.unlink(`./uploads/${items}`, (err)=>{
                if (err && err.errno == -4058) console.log({
                    message: "no such file or directory",
                    path: err.path.replaceAll("\\", "/")
                });
                else if (err) console.log({
                    error: err
                });
            });
        });
        res.status(200).json({
            success: true,
            message: "deleted successfully",
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


var $131d38af0d10413c$require$createMoment = $1bf98d4af449ae8c$export$cdb369e10877f0e4;
var $131d38af0d10413c$require$deleteMoment = $1bf98d4af449ae8c$export$8b33a51056576971;

var $131d38af0d10413c$require$verifyToken = $b3e11ae923d7236b$export$c807668e63e7354b;
var $a6c4baa439f3239b$export$a5575dbeeffdad98;


const $a6c4baa439f3239b$var$storage = $2A20x$multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + $2A20x$path.extname(file.originalname));
    }
});
$a6c4baa439f3239b$export$a5575dbeeffdad98 = $2A20x$multer({
    storage: $a6c4baa439f3239b$var$storage,
    fileFilter: (req, file, cb)=>{
        let allowInputArr = [
            "image/png",
            "image/jpg",
            "image/jpeg"
        ];
        if (allowInputArr.includes(file.mimetype)) cb(null, true);
        else {
            let err = new Error(`Invalid FIle Type`);
            err.name = "INVALID_FILE_TYPE";
            return cb(err, false);
        }
    }
});


var $131d38af0d10413c$require$uploadFile = $a6c4baa439f3239b$export$a5575dbeeffdad98;
$131d38af0d10413c$var$Router.route("/create-moment").post($131d38af0d10413c$require$verifyToken, $131d38af0d10413c$require$uploadFile.array("files", 10), $131d38af0d10413c$require$createMoment);
$131d38af0d10413c$var$Router.route("/delete-moment").delete($131d38af0d10413c$require$verifyToken, $131d38af0d10413c$require$deleteMoment);
$131d38af0d10413c$exports = $131d38af0d10413c$var$Router;


var $a34f8e6b36866a4d$exports = {};

const $a34f8e6b36866a4d$var$Router = $2A20x$express.Router();
var $9e1f832b2a38395f$export$fa7b204ce0e08c5c;
$9e1f832b2a38395f$export$fa7b204ce0e08c5c = (req, res)=>{
    let arr = [
        "Mumbai",
        "Delhi",
        "Bengaluru",
        "Kolkata",
        "Chennai",
        "Ahmedabad",
        "Hyderabad",
        "Pune",
        "Surat",
        "Kanpur",
        "Jaipur",
        "Lucknow",
        "Nagpur",
        "Indore",
        "Patna",
        "Bhopal",
        "Ludhiana",
        "Tirunelveli",
        "Agra",
        "Vadodara"
    ];
    res.status(200).json({
        success: true,
        message: "city list",
        data: arr
    });
};


var $a34f8e6b36866a4d$require$cityList = $9e1f832b2a38395f$export$fa7b204ce0e08c5c;
$a34f8e6b36866a4d$var$Router.route("/city-list").get($a34f8e6b36866a4d$require$cityList);
$a34f8e6b36866a4d$exports = $a34f8e6b36866a4d$var$Router;


// middleware for request
$84a264530b3fb4fb$var$app.use($2A20x$express.json());
$84a264530b3fb4fb$var$app.use("/uploads", $2A20x$express.static("uploads"));
$84a264530b3fb4fb$var$app.use($2A20x$express.urlencoded({
    extended: true
}));
$84a264530b3fb4fb$var$app.use($2A20x$cors({
    credentials: true
}));
$84a264530b3fb4fb$var$app.use($2A20x$cookieparser());
$84a264530b3fb4fb$var$app.get("/", function(req, res) {
    res.send("Welcome to Portal...");
});
//api
$84a264530b3fb4fb$var$app.use("/api/city", $a34f8e6b36866a4d$exports);
$84a264530b3fb4fb$var$app.use("/api/user", $f7c7548b1beb19bd$exports);
$84a264530b3fb4fb$var$app.use("/api/moment", $131d38af0d10413c$exports);
var $e153d4839584db2a$exports = {};
const $e153d4839584db2a$var$sendDevError = (err, res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        code: err.statusCode,
        res: err.data,
        stack: err.stack,
        err: err
    });
};
const $e153d4839584db2a$var$sendProdError = (err, res)=>{
    if (err.isOperational) res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        code: err.statusCode,
        res: err.data
    });
    else {
        console.log("Error \uD83D\uDCA5", err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong...",
            code: 500
        });
    }
};
$e153d4839584db2a$exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Internal Server Error";
    if (err.data) err.data = err.data.map((err)=>err.message);
    $e153d4839584db2a$var$sendProdError(err, res);
};


$84a264530b3fb4fb$var$app.use($e153d4839584db2a$exports);
module.exports = $84a264530b3fb4fb$var$app;


//# sourceMappingURL=server.js.map
