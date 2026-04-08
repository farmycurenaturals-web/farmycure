const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadImage } = require('../middleware/upload');
const { updateProfileImage } = require('../controllers/userController');

router.put('/profile-image', requireAuth, uploadImage.single('image'), updateProfileImage);

module.exports = router;

