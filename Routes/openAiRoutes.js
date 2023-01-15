const express = require("express");
const { genImg } = require("../Controllers/openAiController.js");
const router = express.Router();

router.post("/generateImage", genImg);
// router.post("/generateImage", function (req, res) {
//   res.status(200).json({
//     success: true,
//   });
// });

module.exports = router;
