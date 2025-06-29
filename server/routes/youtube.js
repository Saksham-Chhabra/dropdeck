const router = require("express").Router();
const { search } = require("../controller/youtube");

router.get("/search", search);

module.exports = router;
