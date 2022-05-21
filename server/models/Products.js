const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        taste: {
            type: String,
            default: ""
        },
        price: {
            type: Number
        },
        value: {
            type: Number,
            default: 1
        },
        rating: {
            type: Number,
            default: 0
        },
        reviews: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Products", schema);
