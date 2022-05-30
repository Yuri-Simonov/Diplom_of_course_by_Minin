const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String, default: "" },
        lastName: { type: String, default: "" },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        amountReviews: { type: Number, default: 0 },
        img: { type: String, default: "" },
        registerDate: { type: String, default: "" }
    },
    {
        timestamps: true
    }
);

module.exports = model("Users", schema);
