import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { Table } from '../components/Table';
import { api } from '../services/api';
import { formatINR } from '../utils/currency';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', category: '', image: '', description: '', stock: ''
  });
  const [formError, setFormError] = useState('');

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(Array.isArray(data) ? data : (data.products || []));
      setError('');
    } catch (err) {
      setError('Failed to fetch products. Check backend connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by search
  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Modal Handlers
  const handleOpenModal = (product = null) => {
    setFormError('');
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        image: product.image || '',
        description: product.description || '',
        stock: product.stock || 0
      });
    } else {
      setCurrentProduct(null);
      setFormData({ name: '', price: '', category: '', image: '', description: '', stock: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!formData.name) return setFormError('Name is required');
    if (!formData.price || isNaN(formData.price)) return setFormError('Price must be a valid number (INR)');
    if (!formData.category) return setFormError('Category is required');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      if (currentProduct) {
        await api.updateProduct(currentProduct._id || currentProduct.id, payload);
        setSuccess('Product updated successfully!');
      } else {
        await api.createProduct(payload);
        setSuccess('Product added successfully!');
      }
      
      setShowModal(false);
      fetchProducts(); // Refresh list

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setFormError(err.message || 'Error saving product');
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        setSuccess('Product deleted successfully!');
        fetchProducts();
        setTimeout(() => setSuccess(''), 3000);
      } catch {
        setError('Error deleting product');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const columns = [
    { 
      title: 'Product', 
      dataIndex: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img src={row.image} alt={row.name} className="w-10 h-10 rounded-md object-cover bg-gray-50 border border-gray-100" />
          ) : (
            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center border border-gray-100">No Img</div>
          )}
          <div>
            <span className="font-medium text-gray-900 block">{row.name}</span>
            <span className="text-xs text-gray-500">{formatINR(row.price)}</span>
          </div>
        </div>
      )
    },
    { 
      title: 'Category', 
      dataIndex: 'category',
      render: (row) => <span className="text-gray-500">{row.category}</span>
    },
    { 
      title: 'Stock', 
      dataIndex: 'stock',
      render: (row) => (
        <span className={`${row.stock === 0 ? 'text-red-500 font-medium' : 'text-gray-900'}`}>
          {row.stock}
        </span>
      )
    },
    { 
      title: 'Status', 
      dataIndex: 'status',
      render: (row) => (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
          row.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {row.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      )
    },
    { 
      title: 'Actions', 
      dataIndex: 'actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleOpenModal(row)}
            className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDelete(row._id || row.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 text-sm border border-green-100">
          <AlertCircle size={16} /> {success}
        </div>
      )}

      {/* Page Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your inventory, tracking, and product variants.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-gray-400" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white text-sm rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 py-2 pl-9 pr-4 transition-colors outline-none"
            />
          </div>
          
          {/* Add Product Button */}
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <Table 
          columns={columns} 
          data={filteredProducts} 
          keyExtractor={(row) => row._id || row.id || Math.random()} 
        />
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">
                {currentProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {formError && (
                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {formError}
                </div>
              )}
              
              {/* Image Preview */}
              {formData.image && (
                <div className="mb-4 flex justify-center">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              
              <form id="productForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500 text-sm font-medium" aria-hidden>₹</span>
                      <input 
                        type="text" 
                        inputMode="decimal"
                        placeholder="e.g. 299"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input 
                      type="number" 
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <input 
                    type="text" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors resize-none"
                  ></textarea>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="productForm"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                {currentProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
