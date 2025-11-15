const express = require('express');
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middlewares")
const router = express.Router();
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),
})


/* POST /api/food/ [protected]*/
// Accept both 'video' and 'image' files (image optional)
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'image', maxCount: 1 }
    ]),
    foodController.createFood)


/* GET /api/food/ [protected] */
router.get("/", foodController.getFoodItems)


router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood)


router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)


router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)

// Update and delete food items (partner protected)
router.put('/:id',
    authMiddleware.authFoodPartnerMiddleware,
    foodController.updateFood
)

router.delete('/:id',
    authMiddleware.authFoodPartnerMiddleware,
    foodController.deleteFood
)



module.exports = router