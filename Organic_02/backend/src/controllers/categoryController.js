const Category = require('../models/Category');

const getCategories = async (_req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: 1 });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, categoryCode } = req.body;
    const category = await Category.create({ name, slug, description, image, categoryCode });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, createCategory };
