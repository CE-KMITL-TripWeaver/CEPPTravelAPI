const express = require('express');
const router = express.Router();

const { getAllRestaurant, createRestaurant, deleteRestaurant, getSingleRestaurant, updateRestaurant, deleteAllRestaurant, searchRestaurantByDistrict} = require("../controllers/restaurantController");


router.route('/').get(getAllRestaurant);
router.route('/:id').get(getSingleRestaurant);
router.route('/create').post(createRestaurant);
router.route('/delete/:id').delete(deleteRestaurant);
router.route('/update/:id').put(updateRestaurant);
router.route('/deleteAll').delete(deleteAllRestaurant);
router.route('/searchs/data').get(searchRestaurantByDistrict);


module.exports = router;