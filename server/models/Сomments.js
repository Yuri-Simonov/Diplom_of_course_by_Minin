const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        content: { type: String, required: true },
        // На странице какого продукта находится комментарий
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        // Какой из юзеров оставил комментарий
        userId: { type: Schema.Types.ObjectId, ref: "Users", required: true }
    },
    {
        timestamps: { createdAt: "created_at" }
    }
);

module.exports = model("Comments", schema);
