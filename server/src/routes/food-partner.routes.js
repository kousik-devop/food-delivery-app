const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();


/* /api/food-partner/:id */
router.get("/:id",
    userAuth,
    foodPartnerController.getFoodPartnerById)

module.exports = router;