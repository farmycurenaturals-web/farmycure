import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import CategoryFilter from '../components/shop/CategoryFilter'
import MobileFilters from '../components/shop/MobileFilters'
import ShopProductCard from '../components/shop/ShopProductCard'
import ProductModal from '../components/shop/ProductModal'
import { fadeInUp, staggerContainer } from '../animations/variants'
import { api } from '../services/api'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || null

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBuyNow, setIsBuyNow] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const isValidCategory = (slug) =>
    categories.some((cat) => (cat.categoryCode || cat.slug) === slug)

  const effectiveCategory = activeCategory && isValidCategory(activeCategory)
    ? activeCategory
    : null

  const filteredProducts = useMemo(() => {
    if (!effectiveCategory) return products
    return products.filter((p) => p.category === effectiveCategory)
  }, [effectiveCategory, products])

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.products.list(),
          api.categories.list()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (_error) {
        setProducts([])
        setCategories([])
      }
    }
    loadInitialData()
  }, [])

  const handleCategoryChange = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId })
    } else {
      setSearchParams({})
    }
  }

  const openProductModal = (product, buyNow = false) => {
    setSelectedProduct(product)
    setIsBuyNow(buyNow)
    setIsModalOpen(true)
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    setIsBuyNow(false)
  }

  const activeCategoryName = effectiveCategory
    ? categories.find((c) => (c.categoryCode || c.slug) === effectiveCategory)?.name
    : 'All Products'

  return (
    <main className="py-12 md:py-16 bg-background min-h-[60vh]">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
            Our Products
          </h1>
          <p className="font-body text-gray-600 max-w-2xl">
            Explore our collection of fresh and natural products, sourced directly
            from trusted farms across India.
          </p>
        </motion.div>

        {/* Mobile Filters */}
        <MobileFilters
          activeCategory={effectiveCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />

        {/* Desktop Layout: Sidebar + Grid */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24">
              <CategoryFilter
                activeCategory={effectiveCategory}
                onCategoryChange={handleCategoryChange}
                categories={categories}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-gray-500">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {effectiveCategory && (
                  <> in <span className="font-medium text-forest">{activeCategoryName}</span></>
                )}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                key={effectiveCategory || 'all'}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product._id} variants={fadeInUp}>
                    <ShopProductCard product={product} onOpenModal={openProductModal} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="font-heading text-xl text-text-primary mb-2">No products found</h3>
                <p className="font-body text-gray-500">
                  Try selecting a different category.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal}
        isBuyNow={isBuyNow}
      />
    </main>
  )
}

export default Shop
