const searchVideos = require("../db/search-videos")
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const items = await searchVideos(req.query.query, req.query.perPage || 10, req.query.page || 1);
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
});

module.exports = router;
