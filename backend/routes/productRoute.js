const express = require('express');
const { getAllProducts, updateProducts, removeProduct, getProduct } = require('../controllers/productController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

router.route("/getAllProducts").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER, ROLES.NORMAL_USER]), getAllProducts);
router.route("/getProduct").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER, ROLES.NORMAL_USER]), getProduct);
router.route("/updateProducts").post(authenticateRoles([ROLES.ADMIN]), updateProducts);
router.route("/removeProduct").post(authenticateRoles([ROLES.ADMIN]), removeProduct);

module.exports = router;