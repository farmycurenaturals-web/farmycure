const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { requireAuth, allowRoles } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireAuth, allowRoles('admin', 'owner'), createProduct);
router.put('/:id', requireAuth, allowRoles('admin', 'owner'), updateProduct);
router.delete('/:id', requireAuth, allowRoles('admin', 'owner'), deleteProduct);

module.exports = router;