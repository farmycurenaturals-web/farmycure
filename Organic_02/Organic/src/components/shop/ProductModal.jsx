import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import {
  hasTypeVariants,
  getVariantTypes,
  getQuantities,
  getPrice
} from '../../data/products'

const ProductModal = ({ product, isOpen, onClose, isBuyNow = false }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSubType, setSelectedSubType] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) {
      const isRice = product.id === 'rice'
      const hasTypes = hasTypeVariants(product)
      
      if (isRice) {
        const subTypes = getVariantTypes(product)
        if (subTypes.length > 0) {
          setSelectedSubType(subTypes[0])
          const quantities = getQuantities(product, subTypes[0])
          setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
          setSelectedType(null)
        }
      } else if (hasTypes) {
        const types = getVariantTypes(product)
        if (types.length > 0) {
          setSelectedType(types[0])
          const quantities = getQuantities(product, types[0])
          setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
          setSelectedSubType(null)
        }
      } else {
        setSelectedType(null)
        setSelectedSubType(null)
        const quantities = getQuantities(product)
        setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
      }
      setAdded(false)
    }
  }, [product?.id])

  useEffect(() => {
    if (selectedType && product) {
      const quantities = getQuantities(product, selectedType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
    if (selectedSubType && product) {
      const quantities = getQuantities(product, selectedSubType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
  }, [selectedType, selectedSubType])

  if (!isOpen || !product) return null

  const isRice = product.id === 'rice'
  const isNonVeg = product.category === 'nonVeg'
  const hasTypes = hasTypeVariants(product)
  const variantTypes = getVariantTypes(product)

  const availableQuantities = hasTypes
    ? isRice
      ? getQuantities(product, selectedSubType)
      : getQuantities(product, selectedType)
    : getQuantities(product)

  const currentPrice = isRice
    ? getPrice(product, selectedSubType, selectedQuantity)
    : getPrice(product, selectedType, selectedQuantity)
  
  const canAddToCart = currentPrice !== null && selectedQuantity !== null

  const formatTypeName = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const formatSubTypeName = (subType) => {
    if (subType === 'kala_namak') return 'Kala Namak'
    return subType.charAt(0).toUpperCase() + subType.slice(1)
  }

  const buildVariantLabel = () => {
    const parts = []
    if (isRice && selectedSubType) {
      parts.push(formatSubTypeName(selectedSubType))
    } else if (selectedType) {
      parts.push(formatTypeName(selectedType))
    }
    if (selectedQuantity) parts.push(selectedQuantity)
    return parts.join(' - ')
  }

  const handleAddToCart = () => {
    if (!canAddToCart) return

    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      category: product.category,
      selectedType: isRice ? null : selectedType,
      selectedSubType: isRice ? selectedSubType : null,
      selectedQuantity,
      selectedVariant: buildVariantLabel(),
      price: currentPrice
    }

    addToCart(cartItem, 1)
    setAdded(true)

    if (isBuyNow) {
      setTimeout(() => {
        onClose()
        navigate('/checkout')
      }, 500)
    } else {
      setTimeout(() => {
        setAdded(false)
        onClose()
      }, 1000)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop'
              }}
            />
          </div>

          <div className="flex flex-col">
            <span className={`inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
              isNonVeg ? 'bg-nonveg text-white' : 'bg-sage/20 text-forest'
            }`}>
              {isNonVeg ? 'Non-Veg' : product.category}
            </span>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              {product.title}
            </h2>

            <div className="flex items-baseline gap-2 mb-6">
              <span className={`font-heading text-3xl font-bold ${isNonVeg ? 'text-nonveg' : 'text-forest'}`}>
                {currentPrice ? `₹${currentPrice}` : 'Select options'}
              </span>
            </div>

            {hasTypes && variantTypes.length > 0 && (
              <div className="mb-4">
                <label className="font-body text-sm font-medium text-text-primary mb-2 block">
                  {isRice ? 'Select Type' : 'Select Variant'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variantTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => isRice ? setSelectedSubType(type) : setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        (isRice ? selectedSubType : selectedType) === type
                          ? isNonVeg
                            ? 'bg-nonveg text-white'
                            : 'bg-[#1f4d36] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isRice ? formatSubTypeName(type) : formatTypeName(type)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {availableQuantities.length > 0 && (
              <div className="mb-6">
                <label className="font-body text-sm font-medium text-text-primary mb-2 block">
                  Select Quantity
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableQuantities.map((qty) => {
                    const price = hasTypes
                      ? isRice
                        ? getPrice(product, selectedSubType, qty)
                        : getPrice(product, selectedType, qty)
                      : getPrice(product, null, qty)
                    return (
                      <button
                        key={qty}
                        onClick={() => setSelectedQuantity(qty)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex flex-col items-center min-w-[70px] ${
                          selectedQuantity === qty
                            ? isNonVeg
                              ? 'bg-nonveg text-white'
                              : 'bg-[#1f4d36] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{qty}</span>
                        {price && (
                          <span className={`text-xs ${
                            selectedQuantity === qty ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            ₹{price}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition-all mt-auto ${
                isNonVeg
                  ? 'bg-nonveg hover:bg-[#6E1616] text-white disabled:opacity-50'
                  : 'bg-[#1f4d36] hover:bg-[#163a2a] text-white disabled:bg-gray-300'
              } ${!canAddToCart ? 'cursor-not-allowed' : ''}`}
            >
              {added ? 'Added!' : isBuyNow ? 'Buy Now' : 'Add to Cart'}
            </button>

            {canAddToCart && (
              <p className="font-body text-sm text-gray-500 text-center mt-2">
                {product.title} - {buildVariantLabel()}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductModal
