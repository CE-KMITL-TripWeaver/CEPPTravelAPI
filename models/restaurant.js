const mongoose = require('mongoose')

const restaurantScheme = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    facilities: {
        type: [String],
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
    contact: {
        type: [String]
    },
    publicTransportation: {
        type: [String]
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
    priceRange: [{
        minPrice: {
            type: Number,
            required: true
        },
        maxPrice: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('restaurants',restaurantScheme);