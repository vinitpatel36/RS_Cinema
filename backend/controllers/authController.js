const User = require("../models/user.model");
const { genJWTToken } = require("../services/JWTservice");
const { userLoginValidator, userSignupValidator } = require("../validators/authValidator");
const { hashPassword, compareHash } = require("../services/hashPassword");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const CookieOptions = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
    sameSite: "none"
};

exports.Login = async (req, res) => {
    try {
        console.log("login request : ", req.body)
        const { error } = userLoginValidator.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const { mobile, password } = req.body;

        const user = await User.findOne({ mobile: mobile });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist." });
        }

        const isMatch = await compareHash(password, user.password);

        if (isMatch) {
            const payload = {
                _id: user._id,
                mobile: user.mobile,
                role: user.role
            };

            const token = genJWTToken(payload);


            const userData = {
                _id : user._id,
                name: user.name,
                mobile: user.mobile,
                role: user.role,
            }

            console.log("user : ", userData);


            res.status(200).
                cookie("token", token, CookieOptions).
                json({
                    success: true,
                    message: "logged in successfully",
                    user: userData,
                });

        } else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials !!!" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.Register = async (req, res) => {
    try {

        const { error } = userSignupValidator.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const { mobile, password: userPass } = req.body;

        const user = await User.findOne({ mobile: mobile });

        if (user) {
            return res.
                status(400).
                json({ success: false, message: "Email already exists" });

        } else {

            const hash = await hashPassword(userPass);

            const newUser = new User({
                mobile: mobile,
                password: hash
            });

            const payload = {
                _id: newUser._id,
                mobile: newUser.mobile,
                role: newUser.role
            };


            // Sign token
            const token = genJWTToken(payload);

            // Update the lastLoggedInTime field
            // newUser.lastLoginIp = req.ipAddress;
            // newUser.lastLoggedInTime = Date.now();
            await newUser.save();

            const { password, ...user } = newUser.toObject();
            res.status(200).
                cookie("token", token, CookieOptions).
                json({
                    success: true,
                    message: "Registered in successfully !!!",
                    user: user
                });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.LogOut = async (req, res) => {
    try {
        console.log("here in logout");
        res.clearCookie("token");
        res.status(200).send({ success: "true", message: "Successfully Logged Out" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}
