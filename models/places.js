const mongoose = require('mongoose')

const placeScheme = mongoose.Schema({

    placeId: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    introduction: {
        type: String,
        require: true
    },
    category: {
        categoryId: {
            type: Number,
        },
        name: {
            type: String,
        }
    },
    sha: {
        type: String,
    },
    latitude: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        require: true
    },
    location: {
        address: {
            type: String
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
    thumbnailUrl: {
        type: String,
    },
    tags: {
        type: [String]
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }

});

module.exports = mongoose.model('places',placeScheme);