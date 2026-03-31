import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { fadeInUp, staggerContainer } from '../../animations/variants'

// Featured categories with sub-products for homepage display
const featuredCategories = [
  {
    title: 'Banana',
    description: 'Available in fresh, dehydrated flakes, and powder forms.',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop',
    subProducts: [
      { label: 'Fresh', id: 'banana' },
      { label: 'Dehydrated Flakes', id: 'banana' },
      { label: 'Powder', id: 'banana' },
    ],
    linkId: 'banana',
    accent: 'forest',
  },
  {
    title: 'Rice',
    description: 'Premium quality grains sourced from trusted farms.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
    subProducts: [
      { label: 'Basmati', id: 'rice' },
      { label: 'Kala Namak', id: 'rice' },
    ],
    linkId: 'rice',
    accent: 'forest',
  },
  {
    title: 'Non-Veg',
    description: 'Dehydrated meats and eggs, naturally preserved.',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&h=400&fit=crop',
    subProducts: [
      { label: 'Mutton', id: 'mutton' },
      { label: 'Chicken', id: 'chicken' },
      { label: 'Fish', id: 'fish' },
      { label: 'Shrimp', id: 'shrimp' },
      { label: 'Eggs', id: 'eggs' },
    ],
    linkId: null,
    accent: 'red',
  },
]

const FeaturedCategoryCard = ({ category }) => {
  const isRed = category.accent === 'red'

  return (
    <div className="bg-white rounded-card shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
      {/* Image */}
      <Link to={category.linkId ? `/product/${category.linkId}` : '/shop?category=nonVeg'}>
        <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop'
            }}
          />
          <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${
            isRed ? 'bg-nonveg' : 'bg-forest'
          }`}>
            Featured
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
          {category.title}
        </h3>
        <p className="font-body text-sm text-gray-600 mb-4">
          {category.description}
        </p>

        {/* Sub-products as links */}
        <div className="flex flex-wrap gap-3 mt-4">
          {category.subProducts.map((sub) => (
            <Link
              key={sub.label}
              to={`/product/${sub.id}`}
              className={isRed
                ? "px-4 py-2 text-sm font-medium rounded-full border border-nonveg text-nonveg bg-transparent hover:bg-nonveg hover:text-white transition-all duration-200"
                : "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-[#1f4d36] text-[#1f4d36] bg-transparent hover:bg-[#1f4d36] hover:text-white transition-all duration-200"
              }
            >
              {sub.label}
            </Link>
          ))}
        </div>

        {/* View Button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link to={category.linkId ? `/product/${category.linkId}` : '/shop?category=nonVeg'}>
            <Button
              variant={isRed ? 'nonVeg' : 'primary'}
              size="sm"
              className="w-full"
            >
              Explore {category.title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Featured Products
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Handpicked favorites from our collection. Quality you can taste,
            freshness you can trust.
          </p>
        </motion.div>

        {/* Featured Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {featuredCategories.map((category) => (
            <motion.div key={category.title} variants={fadeInUp}>
              <FeaturedCategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}

export default FeaturedProducts
