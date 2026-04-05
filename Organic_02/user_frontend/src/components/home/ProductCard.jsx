import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { useCart } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <Card hoverable className="h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop'
          }}
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-burnt-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
          {product.name}
        </h3>
        <p className="font-body text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="font-heading text-xl font-bold text-forest">
            ₹{product.price}
          </span>
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard
