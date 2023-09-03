const { verifyJWTToken } = require('../services/JWTservice');
const userModel = require('../models/user.model');

module.exports = (authorizedRoles) => {
    return async (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res
                .status(401)
                .json({ success: false, message:"TokenExpiredError" ,specialMessage: "Not Authorized. Token not found !!!" });
        }
        try {
            const { _id } = verifyJWTToken(token);
            try {
                const user = await userModel.findById(_id);
                if (!user) {
                    return res
                        .status(401)
                        .json({ success: false, message: "TokenExpiredError", specialMessage: "User not found." });
                }

                if (!authorizedRoles.includes(user.role)) {
                    return res
                        .status(403)
                        .json({ success: false, message: "Insufficient permissions." });
                }
                req.user = user;
                next();
            } catch (error) {
                console.log(error);
                return res
                    .status(401)
                    .json({ success: false, message: "Internal server error"});
            }
        } catch (error) {
            console.log(error);
            if (error.name == "TokenExpiredError") {
                return res.clearCookie("token")
                    .status(401)
                    .json({ success: false, message: error.name });

            } else {
                return res
                    .status(401)
                    .json({ success: false, message: error.name });
            }
        }
    };
};
