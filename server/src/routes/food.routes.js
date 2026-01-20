const express = require('express');
const foodController = require("../controllers/food.controller")
const userAuth = require("../middlewares/userAuth");
const router = express.Router();
const multer = require('multer');
const foodPartnerAuth = require("../middlewares/foodPartnerAuth");



const upload = multer({
    storage: multer.memoryStorage(),
})


/* POST /api/food/ [protected]*/
// Accept both 'video' and 'image' files (image optional)
router.post('/',
    foodPartnerAuth,
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'image', maxCount: 1 }
    ]),
    foodController.createFood)


/* GET /api/food/ [protected] */
router.get("/", foodController.getFoodItems)


router.post('/like',
    userAuth,
    foodController.likeFood)


router.post('/save',
    userAuth,
    foodController.saveFood
)


router.get('/save',
    userAuth,
    foodController.getSaveFood
)

// Update and delete food items (partner protected)
router.put('/:id',
    foodPartnerAuth,
    foodController.updateFood
)

router.delete('/:id',
    foodPartnerAuth,
    foodController.deleteFood
)



module.exports = router