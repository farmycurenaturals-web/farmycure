import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { getStartingPrice } from '../../data/products'

const ShopProductCard = ({ product, onOpenModal }) => {
  const startingPrice = getStartingPrice(product)
  const isNonVeg = product.category === 'nonVeg'

  return (
    <Card hoverable className="h-full flex flex-col">
      {/* Image - clickable to open modal */}
      <div 
        onClick={() => onOpenModal(product)}
        className="cursor-pointer"
      >
        <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop'
            }}
          />
          {/* Category Badge */}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
            isNonVeg 
              ? 'bg-nonveg text-white' 
              : 'bg-forest/90 text-white'
          }`}>
            {product.category === 'nonVeg' ? 'Non-Veg' : product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div 
          onClick={() => onOpenModal(product)}
          className="cursor-pointer"
        >
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-2 hover:text-forest transition-colors">
            {product.title}
          </h3>
        </div>
        <p className="font-body text-sm text-gray-600 mb-4 flex-1">
          Available in multiple variants
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className={`font-heading text-xl font-semibold ${isNonVeg ? 'text-nonveg' : 'text-forest'}`}>
            {startingPrice ? `Starting at ₹${startingPrice}` : 'Price varies'}
          </span>
        </div>

        {/* Add to Cart and Buy Now Buttons */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => onOpenModal(product)}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              isNonVeg
                ? "bg-nonveg hover:bg-[#6E1616] text-white"
                : "bg-[#1f4d36] hover:bg-[#163a2a] text-white"
            }`}
          >
            Add to Cart
          </button>

          <button
            onClick={() => onOpenModal(product, true)}
            className={`flex-1 py-2 rounded-lg font-medium border transition ${
              isNonVeg
                ? "border-nonveg text-nonveg hover:bg-nonveg hover:text-white"
                : "border-[#1f4d36] text-[#1f4d36] hover:bg-[#1f4d36] hover:text-white"
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </Card>
  )
}

export default ShopProductCard
