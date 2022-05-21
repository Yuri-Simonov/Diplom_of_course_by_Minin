const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        amountReviews: { type: Number, default: 0 },
        img: { type: String },
        registerDate: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = model("Users", schema);
