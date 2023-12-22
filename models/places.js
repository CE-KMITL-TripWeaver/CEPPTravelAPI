const mongoose = require('mongoose')

const placeScheme = mongoose.Schema({

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
    longtitude: {
        type: Number,
        require: true
    },
    location: {
        address: {
            type: String
        },
        province: {
            provinceID: {
                type: Number
            },
            name: {
                type: String
            },
        },
        district: {
            districtID: {
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
    createAt: {
        type: String
    },
    updatedAt: {
        type: String
    }

});

module.exports = mongoose.model('places',placeScheme);