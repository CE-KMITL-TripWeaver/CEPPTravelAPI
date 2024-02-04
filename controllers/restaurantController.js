const asyncHandler = require('express-async-handler');
const restaurant = require('../models/restaurant');

// Get all restaurant => GET api/restaurant
const getAllRestaurant = asyncHandler(async (req,res) => {
    const restaurantList  = await restaurant.find();
    res.status(200).json(restaurantList);
});

// Create new restaurant => POST api/restaurants/create
const createRestaurant = asyncHandler(async (req,res) => {
    try {
        
        const data = req.body;
        //console.log(req.body);

        let existingRestaurant;

        const {name, location: {province: {provinceId} } } = req.body;

        existingRestaurant = await restaurant.findOne(
            {
                "name": name,
                "location.province.provinceId": provinceId
            }      
        )

        if(existingRestaurant) {
            return res.status(400).json({ message: `Name: ${name} and ${provinceId} already exists`});
        }

        const restaurantCreated = await restaurant.create(req.body);
        return res.status(200).json(req.body);

    } catch(err) {
        console.log(err);
    }
});

// Delete restaurant => DELETE api/restaurants/delete/:id
const deleteRestaurant = asyncHandler(async (req,res) => {
    try {
        const restaurantID = req.params.id;
        const deleteRestaurant = await restaurant.findById(restaurantID);

        if(!deleteRestaurant) {
            return res.status(404).send("Restaurant ID not found!");
        }

        await restaurant.findByIdAndDelete(restaurantID);

        res.status(200).send({
            message: `Deleted ${restaurantID} from database!`
        });
    } catch(err) {
        console.log(err);
    }
});

// Get single restaurant => GET api/restaurants/:id
const getSingleRestaurant = asyncHandler(async (req,res) => {
    try {
        const restaurantID = req.params.id;

        const targetRestaurant = await restaurant.findById(restaurantID);
        if(!targetRestaurant) {
            return res.status(404).send("Restaurant ID not found!");
        }
        res.status(200).json(targetRestaurant);
    } catch(err) {
        console.log(err);
    }
});

// Update restaurant => api/restaurants/update/:id

const updateRestaurant = asyncHandler(async (req,res) => {
    try {
        const restaurantID = req.params.id;

        let targetRestaurant = await restaurant.findById(restaurantID);

        if(!targetRestaurant) {
            return res.status(404).send("Restaurant ID not found!");
        }

        targetRestaurant = await restaurant.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })

        res.status(200).json(targetRestaurant);
    } catch(err) {
        console.log(err);
    }
});

// Get multiple restaurants that match District  => GET api/restaurants/searchs/data/?province=ราชบุรี&district=เมืองราชบุรี
const searchRestaurantByDistrict = asyncHandler(async (req,res) => {
    try {
        const { province,district,subDistrict } = req.query;
        
        let restaurantList;
        if(province) {
            restaurantList = await restaurant.find({'location.province.name': province});
        }

        if(district) {
            restaurantList = await restaurant.find({'location.district.name': district});
        }

        if(subDistrict) {
            restaurantList = await restaurant.find({'location.subDistrict.name': subDistrict});
        }

        return res.status(200).json(restaurantList);

    } catch(err) {
        console.log(err);
    }
});


// Delete restaurant  => api/restaurants/deleteAll
const deleteAllRestaurant = asyncHandler(async (req,res) => {
    //await restaurant.deleteMany( { } );

    return res.status(200).json({ message: `Deleted all data!`})
}) 

module.exports = { getAllRestaurant, createRestaurant, deleteRestaurant, getSingleRestaurant, updateRestaurant, deleteAllRestaurant, searchRestaurantByDistrict};