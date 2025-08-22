const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');

router.post('/update', auth, inventoryController.updateStock);
router.get('/low-stock', auth, inventoryController.lowStock);

module.exports = router;
