const express = require("express");
const router = express.Router({ mergeParams: true });

// /api/auth
router.use("/auth", require("./auth.routes"));
router.use("/comments", require("./comments.routes"));
router.use("/products", require("./products.routes"));
router.use("/users", require("./users.routes"));

module.exports = router;
