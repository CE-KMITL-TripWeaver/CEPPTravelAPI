const asyncHandler = require('express-async-handler');
const places = require('../models/places');

// Get all places => GET api/places
const getAllPlaces = asyncHandler(async (req,res) => {
    const placesList  = await places.find();
    res.status(200).json(placesList);
});

// Create new place => POST api/places/create
const createPlace = asyncHandler(async (req,res) => {
    try {
        
        const data = req.body;
        //console.log(req.body);

        let existingPlace;

        if(Array.isArray(data)) {
            for (let i = 0 ; i < data.length ; i++) {
                const place = data[i];

                existingPlace = await places.findOne(
                    {
                        "name": place.name,
                        "location.province.provinceId": place.location.province.provinceId
                    }    
                )

                if(existingPlace) {
                    console.log(`Name: ${place.name} and ${ place.location.province.provinceId} already exists`);
                    continue;
                }

                if(place.category.categoryId === 8 || place.category.categoryId === 2) { // 8 = Food Shop , 2 = Accommodation
                    console.log(`Name: ${place.name} and ${place.location.province.provinceId} not match categoryID with ${place.category.categoryId}`);
                }

                const placeCreated = await places.create(place);
            }

            return res.status(200).json(`Created multiple data successfully!`);
        } else {
            const {name, location: {province: {provinceId} }, category: {categoryId}} = req.body;

            existingPlace = await places.findOne(
                {
                    "name": name,
                    "location.province.provinceId": provinceId
                }    
            )

            if(existingPlace) {
                return res.status(400).json({ message: `Name: ${name} and ${provinceId} already exists`});
            }

            if(categoryId === 8 || categoryId === 2) { // 8 = Food Shop , 2 = Accommodation
                return res.status(400).json({ message: `Name: ${name} and ${provinceId} not match categoryID with ${categoryId}`});
            }



            const placeCreated = await places.create(req.body);
        }
        return res.status(200).json(req.body);

    } catch(err) {
        console.log(err);
    }
});

// Delete place => DELETE api/places/delete/:id
const deletePlace = asyncHandler(async (req,res) => {
    try {
        const placeID = req.params.id;
        const deletePlace = await places.findById(placeID);

        if(!deletePlace) {
            return res.status(404).send("Places ID not found!");
        }

        await places.findByIdAndDelete(placeID);

        res.status(200).send({
            message: `Deleted ${placeID} from database!`
        });
    } catch(err) {
        console.log(err);
    }
});

// Get single place => GET api/places/:id
const getSinglePlace = asyncHandler(async (req,res) => {
    try {
        const placeID = req.params.id;

        const targetPlace = await places.findById(placeID);
        if(!targetPlace) {
            return res.status(404).send("Places ID not found!");
        }
        res.status(200).json(targetPlace);
    } catch(err) {
        console.log(err);
    }
});

// Update place => api/places/update/:id

const updatePlace = asyncHandler(async (req,res) => {
    try {
        const placeID = req.params.id;

        let targetPlace = await places.findById(placeID);

        if(!targetPlace) {
            return res.status(404).send("Places ID not found!");
        }

        const {name, location: {province: {provinceId} }, category: {categoryId}} = req.body;

        const existingPlace = await places.findOne(
            {
                "name": name,
                "location.province.provinceId": provinceId
            }    
        )

        if(existingPlace) {
            return res.status(400).json({ message: `Name: ${name} and ${provinceId} already exists`});
        }

        if(categoryId === 8 || categoryId === 2) { // 8 = Food Shop , 2 = Accomodation
            return res.status(400).json({ message: `Name: ${name} and ${provinceId} not match categoryID with ${categoryId}`});
        }

        targetPlace = await places.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })

        res.status(200).json(targetPlace);
    } catch(err) {
        console.log(err);
    }
});


// Delete place => api/places/deleteAll
const deleteAllPlaces = asyncHandler(async (req,res) => {
    await places.deleteMany( { } );

    return res.status(200).json({ message: `Deleted all data!`})
}) 

module.exports = { getAllPlaces, createPlace, deletePlace, getSinglePlace, updatePlace, deleteAllPlaces};