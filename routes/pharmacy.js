const router = require('express').Router();
const { getNearest } = require('../controllers/pharmacyController')

//ROUTES
router.get('/nearest', getNearest)

module.exports = router;