const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.get('/', auth, bookController.getAll);
router.get('/:id', auth, bookController.getOne);
router.post('/', auth, bookController.create);
router.put('/:id', auth, bookController.update);
router.delete('/:id', auth, bookController.delete);

module.exports = router;
