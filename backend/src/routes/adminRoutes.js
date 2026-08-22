const express = require('express');
const router = express.Router();
const { getAnalytics, getAllUsers, createCategory } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);
router.post('/categories', createCategory);

module.exports = router;
