const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model")
const saveModel = require("../models/save.model")
const { v4: uuid } = require("uuid")


async function createFood(req, res) {
    // Handle optional uploads: multer.fields stores files in req.files
    let videoUrl = null;
    let imageUrl = null;

    if (req.files && req.files.video && req.files.video[0]) {
        const fileUploadResult = await storageService.uploadFile(req.files.video[0].buffer, uuid())
        videoUrl = fileUploadResult.url
    }

    if (req.files && req.files.image && req.files.image[0]) {
        const imageUploadResult = await storageService.uploadFile(req.files.image[0].buffer, uuid())
        imageUrl = imageUploadResult.url
    }

    const foodItem = await foodModel.create({
        restaurantName: req.body.restaurantName,
        price: req.body.price,
        foodName: req.body.foodName,
        category: req.body.category,
        description: req.body.description,
        video: videoUrl,
        image: imageUrl,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

}

async function getFoodItems(req, res) {
    // Populate the foodPartner to provide restaurant details (name, address)
    const foodItems = await foodModel.find({}).populate('foodPartner', 'restaurantName address ownerName');
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}


async function likeFood(req, res) {
    const { foodId } = req.body;
    const userId = req.user.id; // Correctly access the user ID from the token payload

    const isAlreadyLiked = await likeModel.findOne({
        user: userId,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: userId,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: userId,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}


// Export functions (moved to bottom after all function declarations)

async function updateFood(req, res) {
    const foodId = req.params.id;
    const updates = {};

    // Only allow updating certain fields
    const allowed = ['foodName', 'price', 'description', 'category'];
    for (const key of allowed) {
        if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const foodItem = await foodModel.findById(foodId);
    if (!foodItem) {
        return res.status(404).json({ message: 'Food not found' });
    }

    // Ensure the requesting partner owns this food
    if (String(foodItem.foodPartner) !== String(req.foodPartner._id)) {
        return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    await foodModel.findByIdAndUpdate(foodId, updates);
    const updated = await foodModel.findById(foodId);
    res.status(200).json({ message: 'Food updated', food: updated });
}

async function deleteFood(req, res) {
    const foodId = req.params.id;
    const foodItem = await foodModel.findById(foodId);
    if (!foodItem) {
        return res.status(404).json({ message: 'Food not found' });
    }

    if (String(foodItem.foodPartner) !== String(req.foodPartner._id)) {
        return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await foodModel.findByIdAndDelete(foodId);
    res.status(200).json({ message: 'Food deleted' });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
    updateFood,
    deleteFood
}