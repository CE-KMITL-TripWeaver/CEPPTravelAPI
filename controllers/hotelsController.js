const asyncHandler = require('express-async-handler');
const hotels = require('../models/hotels')

// Get all hotels => GET api/hotels
const getAllHotels = asyncHandler(async (req,res) => {
    const hotelsList  = await hotels.find();
    res.status(200).json(hotelsList);
});

// Create new hotel => POST api/hotels/create
const createHotel = asyncHandler(async (req,res) => {
    try {
        
        const data = req.body;
        //console.log(req.body);

        let existingHotel;

        if(Array.isArray(data)) {
            for (let i = 0 ; i < data.length ; i++) {
                const hotel = data[i];

                existingHotel = await hotels.findOne(
                    {
                        "name": hotel.name
                    }    
                )

                if(existingHotel) {
                    console.log(`Name: ${hotel.name} already exists`);
                    continue;
                }

                const hotelCreated = await hotels.create(hotel);
            }

            return res.status(200).json(`Created multiple data successfully!`);
        } else {
            const {name} = req.body;

            existingHotel = await hotels.findOne(
                {
                    "name": name,
                }    
            )

            if(existingHotel) {
                return res.status(400).json({ message: `Name: ${name} already exists`});
            }

            const hotelCreated = await hotels.create(req.body);
        }
        return res.status(200).json(req.body);

    } catch(err) {
        console.log(err);
    }
});

// Delete hotel => DELETE api/hotels/delete/:id
const deletehotel = asyncHandler(async (req,res) => {
    try {
        const hotelID = req.params.id;
        const deletehotel = await hotels.findById(hotelID);

        if(!deletehotel) {
            return res.status(404).send("hotels ID not found!");
        }

        await hotels.findByIdAndDelete(hotelID);

        res.status(200).send({
            message: `Deleted ${hotelID} from database!`
        });
    } catch(err) {
        console.log(err);
    }
});

// Get single hotel => GET api/hotels/:id
const getSinglehotel = asyncHandler(async (req,res) => {
    try {
        const hotelID = req.params.id;

        const targethotel = await hotels.findById(hotelID);
        if(!targethotel) {
            return res.status(404).send("hotels ID not found!");
        }
        res.status(200).json(targethotel);
    } catch(err) {
        console.log(err);
    }
});

// Update hotel => api/hotels/update/:id

const updatehotel = asyncHandler(async (req,res) => {
    try {
        const hotelID = req.params.id;

        let targethotel = await hotels.findById(hotelID);

        if(!targethotel) {
            return res.status(404).send("hotels ID not found!");
        }

        targethotel = await hotels.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })

        res.status(200).json(targethotel);
    } catch(err) {
        console.log(err);
    }
});

module.exports = {getAllHotels,getSinglehotel,createHotel,updatehotel,deletehotel}