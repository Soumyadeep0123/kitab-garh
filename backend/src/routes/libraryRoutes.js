const express = require('express');
const router = express.Router();
const { getMyLibrary, addToLibrary, getProgress, updateProgress } = require('../controllers/libraryController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getMyLibrary);
router.post('/add', addToLibrary);
router.get('/progress/:bookId', getProgress);
router.put('/progress/:bookId', updateProgress);

module.exports = router;
