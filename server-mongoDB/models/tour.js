const mongoose = require('mongoose');
const id_validator = require ('mongoose-id-validator');

var TourSchema = new mongoose.Schema({
    tourname: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1) {
                throw new Error('Duration must to be a positive number')
            }
        }
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Price must to be a positive number or zero')
            }
        }
    },
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide',required:true},
    path:{
        required: false,
        type: Array,
        trim: true
    },
}, { timestamps: true });
TourSchema.plugin(id_validator);
TourSchema.index("completed");


const Tour = mongoose.model('Tour', TourSchema );

module.exports = Tour