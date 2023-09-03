const express = require('express');
const { GetUser, GetAllUsers, DeleteUser, ResetPass, EditUser, GetNewUsers, EditUserVerification } = require('../controllers/userController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

router.route("/getUser")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR, ROLES.STD_USER]), GetUser);

router.route("/getUsers")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR, ROLES.STD_USER]), GetAllUsers);


router.route("/getNewUsers")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), GetNewUsers);

router.route("/updateUserVerification")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), EditUserVerification);
router.route("/updateUser")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), EditUser);
router.route("/deleteUser")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), DeleteUser);
router.route("/update-password")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), ResetPass);

module.exports = router;