const mongoose = require('mongoose')

const hotelScheme = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    lat: {
        type: Number,
        require: true
    },
    lon: {
        type: Number,
        require: true
    },
    icon: {
        type : String
    },
    url: {
        type : String
    },
    address: {
        type: String,
        require: true
    },
    tel: {
        type: String
    },
    tag : [String],
    contributor: {
        type: String
    },
    verified: {
        type: Boolean
    },
    obsoleted: {
        type: Boolean
    },
    working_hours: [
        {
            remark: String,
            hours: [
                {
                    day: String,
                    start: String,
                    end: String
                }
            ]
        }
    ]

});

module.exports = mongoose.model('hotels',hotelScheme);