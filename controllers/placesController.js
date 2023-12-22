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
        const place = await places.create(req.body);
        res.status(200).json(place);
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

        targetPlace = await places.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })

        res.status(200).json(targetPlace);
    } catch(err) {
        console.log(err);
    }
});

module.exports = { getAllPlaces, createPlace, deletePlace, getSinglePlace, updatePlace};