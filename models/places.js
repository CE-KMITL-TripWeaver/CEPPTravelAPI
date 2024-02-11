const mongoose = require('mongoose')

const placeScheme = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    facilities: {
        type: [String],
    },
    activities: {
        type: [String],
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true
        },
        province: {
            provinceId: {
                type: Number
            },
            name: {
                type: String
            },
        },
        district: {
            districtId: {
                type: Number
            },
            name: {
                type: String
            } 
        },
        subDistrict: {
            subDistrictId: {
                type: Number
            },
            name: {
                type: String
            }
        },
        postcode: {
            type: Number
        }
    },
    imagePath: {
        type: [String],
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
    rating: {
        score: {
            type: Number
        },
        ratingCount: {
            type: Number
        }
    },
    openingHours: [{
        day: {
            type: String
        },
        open: {
            type: String
        },
        close: {
            type: String
        }
    }],
    ticketRate: [{ 
        foreignerStatus: {
            type: String,
            enum: ["Thai", "Foreigner"],
        },
        ageGroup: {
            type: String,
            enum: ["Child", "Adult"],
        },
        price: {
            type: Number
        } 
    }],
    contact: {
        type: [String]
    },
    publicTransportation: {
        type: [String]
    }
});

module.exports = mongoose.model('places',placeScheme);