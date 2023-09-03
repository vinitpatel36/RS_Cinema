const express = require('express');
const { getAllVariables } = require('../controllers/systemController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

router.route("/getAllVariables").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER, ROLES.NORMAL_USER]), getAllVariables);

module.exports = router;