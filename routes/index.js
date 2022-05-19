var express = require('express');
var router = express.Router();

const AutoWash = require("../src/controller/auto");
const Schedule = require("../src/controller/schedule");



/* GET home page. */
router.get('/check', async (req, res, next) => {

  const wash = new AutoWash({id: req.query.id, passwd: req.query.passwd});
  await wash.check();
  res.json('okay');
});

router.get('/day', async (req, res, next) => {

  const sche = new Schedule();
  await sche.daySchedule(req.query);
  res.json('okay');
});

module.exports = router;
