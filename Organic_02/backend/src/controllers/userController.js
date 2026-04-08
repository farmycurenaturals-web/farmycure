const User = require('../models/User');

const buildAssetUrl = (req, filename) => {
  const base = `${req.protocol}://${req.get('host')}`;
  return `${base}/uploads/${filename}`;
};

const updateProfileImage = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const profileImage = buildAssetUrl(req, req.file.filename);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage },
      { new: true, select: '_id name email role profileImage' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      message: 'Profile image updated',
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfileImage };

