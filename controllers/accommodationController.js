const asyncHandler = require('express-async-handler');
const accommodation = require('../models/accommodation');

// Get all accommodation => GET api/accommodations
const getAllAccommodation = asyncHandler(async (req,res) => {
    const accommodationList  = await accommodation.find();
    res.status(200).json(accommodationList);
});

// Create new accommodation => POST api/accommodations/create
const createAccommodation = asyncHandler(async (req,res) => {
    try {
        
        const data = req.body;
        //console.log(req.body);

        let existingAccommodation;
        let checkLatLong;

        const {name, location: {province: {provinceId} },latitude,longitude } = req.body;

        checkLatLong = await accommodation.findOne(
            {
                "latitude": latitude,
                "longitude": longitude
            }      
        )

        existingAccommodation = await accommodation.findOne(
            {
                "name": name,
                "location.province.provinceId": provinceId
            }      
        )
        

        if(existingAccommodation || checkLatLong) {
            return res.status(400).json({ message: `Name: ${name} and ${provinceId} already exists`});
        }

        const accommodationCreated = await accommodation.create(req.body);
        return res.status(200).json(req.body);

    } catch(err) {
        console.log(err);
    }
});

// Delete accommodation => DELETE api/accommodations/delete/:id
const deleteAccommodation = asyncHandler(async (req,res) => {
    try {
        const accommodationID = req.params.id;
        const deleteAccommodation = await accommodation.findById(accommodationID);

        if(!deleteAccommodation) {
            return res.status(404).send("Accommodation ID not found!");
        }

        await accommodation.findByIdAndDelete(accommodationID);

        res.status(200).send({
            message: `Deleted ${accommodationID} from database!`
        });
    } catch(err) {
        console.log(err);
    }
});

// Get single accommodation => GET api/accommodations/:id
const getSingleAccommodation = asyncHandler(async (req,res) => {
    try {
        const accommodationID = req.params.id;

        const targetAccommodation = await accommodation.findById(accommodationID);
        if(!targetAccommodation) {
            return res.status(404).send("Accommodation ID not found!");
        }
        res.status(200).json(targetAccommodation);
    } catch(err) {
        console.log(err);
    }
});

// Update accommodation => api/accommodations/update/:id

const updateAccommodation = asyncHandler(async (req,res) => {
    try {
        const accommodationID = req.params.id;

        let targetAccommodation = await accommodation.findById(accommodationID);

        if(!targetAccommodation) {
            return res.status(404).send("Accommodation ID not found!");
        }

        targetAccommodation = await accommodation.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })

        res.status(200).json(targetAccommodation);
    } catch(err) {
        console.log(err);
    }
});

// Get multiple accommodations that match District  => GET api/accommodations/searchs/data/?province=ราชบุรี&district=เมืองราชบุรี
const searchAccommodationByDistrict = asyncHandler(async (req,res) => {
    try {
        const { province,district,subDistrict } = req.query;
        
        let accommodationList;
        if(province) {
            accommodationList = await accommodation.find({'location.province.name': province});
        }

        if(district) {
            accommodationList = await accommodation.find({'location.district.name': district});
        }

        if(subDistrict) {
            accommodationList = await accommodation.find({'location.subDistrict.name': subDistrict});
        }

        return res.status(200).json(accommodationList);

    } catch(err) {
        console.log(err);
    }
});


// Delete accommodation  => api/accommodations/deleteAll
const deleteAllAccommodation = asyncHandler(async (req,res) => {
    await accommodation.deleteMany( { } );

    return res.status(200).json({ message: `Deleted all data!`})
}) 

module.exports = { getAllAccommodation, createAccommodation, deleteAccommodation, getSingleAccommodation, updateAccommodation, deleteAllAccommodation, searchAccommodationByDistrict};