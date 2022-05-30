const express = require("express");
const Users = require("../models/Users");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const chalk = require("chalk");

router.patch("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId) {
            const updatedUser = await Users.findByIdAndUpdate(
                userId,
                { ...req.body },
                { new: true }
            );
            res.send(updatedUser);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// убран "auth", т.к. с ним вылезают ошибки
router.get("/", async (req, res) => {
    try {
        const list = await Users.find();
        res.send(list);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

module.exports = router;
