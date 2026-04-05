const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('../controllers/categoryController');
const { requireAuth, allowRoles } = require('../middleware/authMiddleware');

router.get('/', getCategories);
router.post('/', requireAuth, allowRoles('admin', 'owner'), createCategory);

module.exports = router;
