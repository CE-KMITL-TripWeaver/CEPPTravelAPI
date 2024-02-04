const mongoose = require('mongoose')

const accommodationScheme = mongoose.Schema({

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
    roomType: {
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
    reviews: {
        score: {
            type: Number
        },
        reviewerCount: {
            type: Number
        }
    },
    contact: {
        type: [String]
    },
    publicTransportation: {
        type: [String]
    },
    priceRange: [{
        minPrice: {
            type: Number,
            required: true
        },
        maxPrice: {
            type: Number,
            required: true
        },
    }]
});

module.exports = mongoose.model('accommodations',accommodationScheme);