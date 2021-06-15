const mongoose = require('mongoose')
const validator = require('validator')

var GuideSchema = new mongoose.Schema({
    guide_name: {
        type: String,
        required: true,
        trim: true
    },
    guide_email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    guide_phone: {
        type: Number,
        required: true,
        minlength: 10,
        trim: true,
        validate(value) {
            if (value.minlength < 10) {
                throw new Error('phone number must contain 10 digits')
            }
        }
    }
}, { timestamps: true }
);

const Guide = mongoose.model('Guide', GuideSchema);

module.exports = Guide