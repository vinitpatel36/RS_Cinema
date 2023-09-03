const User = require("../models/user.model");
const { hashPassword } = require("../services/hashPassword");
const { userValidator, userIdObjectValidator, useAccountRoleValidator } = require("../validators/userValidator");
const { passwordValidator } = require("../validators/authValidator");

exports.GetUser = async (req, res) => {
    const _id = req.body;
    console.log(_id);
    try {
        const user = await User.findById(_id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

exports.GetAllUsers = async (req, res) => {
    try {
        const rowUsers = await User.find().select("-password").populate('verifiedBy', 'email');
        const users = rowUsers.map((wholeUser) => {
            var user = wholeUser._doc;
            var muser;
            if (user.verifiedBy) {
                muser = {
                    ...user,
                    verifiedBy: user.verifiedBy.email || "-",
                }
            } else {
                muser = {
                    ...user,
                    verifiedBy: "-",
                }
            }
            return muser
        });
        if (!users) {
            return res.status(404).json({ message: "There is no user account" });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

exports.GetNewUsers = async (req, res) => {
    try {
        const rowUsers = await User.find({ isApproved: false }).select("-password").populate('verifiedBy', 'email');
        const users = rowUsers.map((wholeUser) => {
            var user = wholeUser._doc;
            var muser;
            console.log(user);
            if (user.verifiedBy) {
                muser = {
                    ...user,
                    verifiedBy: user.verifiedBy.email || "-",
                }
            } else {
                muser = {
                    ...user,
                    verifiedBy: "-",
                }
            }
            return muser
        });
        console.log("user : ", users);
        if (!users) {
            return res.status(404).json({ message: "Users not found." });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

exports.EditUserVerification = async (req, res) => {

    const id = req.user;
    const { error } = userIdObjectValidator.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    const { _id } = req.body;

    try {
        const user = await User
            .findByIdAndUpdate(_id, {
                isVerified: true,
                verifiedBy: id._id,
            }, { new: true })
            .select("userName isVerified verifiedBy email isEmailVerified ");

        if (!user) {
            return res.status(404).json({ success: false, message: "Account not found" });
        }
        res.status(200).json({ success: true, user, message: "Account is verified" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}
exports.EditUseAccountApproval = async (req, res) => {
    const { error } = userIdObjectValidator.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    const { _id } = req.body;
    try {
        const user = await User
            .findByIdAndUpdate(_id, {
                isApproved: true,
            }, { new: true })
            .select("isApproved isVerified verifiedBy email isEmailVerified ");
        if (!user) {
            return res.status(404).json({ success: false, message: "Account not found" });
        }
        res.status(200).json({ success: true, user, message: "Account is Approved" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}
exports.EditUseAccountRole = async (req, res) => {
    const { error } = useAccountRoleValidator.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    const data = req.body;

    try {
        const user = await User
            .findByIdAndUpdate(data._id, {
                role: data.role,
            }, { new: true })
            .select("role isVerified verifiedBy email isEmailVerified ");

        if (!user) {
            return res.status(404).json({ success: false, message: "Account not found" });
        }
        res.status(200).json({ success: true, user, message: "Role is changed to : " + user.role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}
exports.EditUser = async (req, res) => {
    const { _id } = req.user;
    const { error } = userValidator.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    const { email, password } = req.body;
    let hash;
    if (password) {
        hash = await hashPassword(password);
    }
    try {
        const user = await User
            .findByIdAndUpdate(_id, {
                email: email,
                password: hash
            }, { new: true })
            .select("userName email isEmailVerified registeredOn lastLoggedInTime");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}

exports.DeleteUser = async (req, res) => {

    const { _id } = req.user;

    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, message: "Internal Server Error."
        });
    }
}

exports.ResetPass = async (req, res) => {

    const { _id } = req.user;

    const { error } = passwordValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }

    const { password } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const newHash = await hashPassword(password);

        user.password = newHash;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }

}