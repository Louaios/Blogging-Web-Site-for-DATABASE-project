const express = require('express');
const router = express.Router();
const reportController = require('../Controllers/reportController');


router.post('/report/:id_user', reportController.addReport);
router.get('/report' , reportController.getReports);

module.exports = router;