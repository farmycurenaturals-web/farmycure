import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const Partners = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    yearsInOperation: '',
    gstNumber: '',
    registrationNumber: '',
    website: '',
    contactName: '',
    designation: '',
    phone: '',
    email: '',
    productsInterested: [],
    estimatedVolume: '',
    packagingPreference: '',
    deliveryLocation: '',
    startDate: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const businessTypes = [
    'Retailer',
    'Distributor',
    'Restaurant / Hotel',
    'Exporter',
    'Food Manufacturer',
    'Wholesaler',
    'Other'
  ]

  const productsList = [
    'Fruits',
    'Vegetables',
    'Grains',
    'Non-Veg',
    'All Categories'
  ]

  const volumeOptions = [
    'Less than 100kg',
    '100–500kg',
    '500kg–1 Ton',
    '1–5 Tons',
    '5+ Tons'
  ]

  const packagingOptions = [
    'Standard Bulk Packaging',
    'Custom Packaging',
    'Private Label'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMultiSelect = (value) => {
    setFormData(prev => {
      const current = prev.productsInterested
      if (current.includes(value)) {
        return { ...prev, productsInterested: current.filter(p => p !== value) }
      }
      return { ...prev, productsInterested: [...current, value] }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Partner submission:', formData)

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        companyName: '',
        businessType: '',
        yearsInOperation: '',
        gstNumber: '',
        registrationNumber: '',
        website: '',
        contactName: '',
        designation: '',
        phone: '',
        email: '',
        productsInterested: [],
        estimatedVolume: '',
        packagingPreference: '',
        deliveryLocation: '',
        startDate: '',
        message: ''
      })
    }, 5000)
  }

  const scrollToForm = () => {
    document.getElementById('partnership-form').scrollIntoView({ behavior: 'smooth' })
  }

  const whyFeatures = [
    {
      title: 'Bulk Supply Capability',
      description: 'Reliable large-scale sourcing of fruits, vegetables, grains, and livestock products.'
    },
    {
      title: 'Direct Farm Sourcing',
      description: 'Transparent supply chain from soil to delivery.'
    },
    {
      title: 'Custom Packaging & Private Label',
      description: 'Flexible packaging solutions tailored to your business needs.'
    },
    {
      title: 'Quality & Consistency',
      description: 'Standardized grading, processing, and quality assurance systems.'
    }
  ]

  const wholesaleCategories = [
    {
      title: 'Organic Produce',
      items: ['Fresh, Flakes, Powder formats', 'Custom bulk packaging', 'Seasonal sourcing options']
    },
    {
      title: 'Grains & Staples',
      items: ['Basmati Rice', 'Kala Namak Rice', 'Wheat', 'Soybean', '25kg / 50kg export-ready bags']
    },
    {
      title: 'Livestock & Protein',
      items: ['Dehydrated Meat Products', 'Kadaknath', 'Sonali', 'Bulk poultry supply']
    }
  ]

  const targetBusinesses = [
    'Retail Chains',
    'Supermarkets',
    'Distributors',
    'Hotels & Restaurants',
    'Exporters',
    'Food Processing Units'
  ]

  return (
    <>
      <Helmet>
        <title>FarmyCure Partners | Wholesale & Business Collaboration</title>
        <meta name="description" content="Partner with FarmyCure for bulk organic produce, grains, and livestock products. Reliable sourcing, scalable supply, and transparent farm-direct distribution." />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative min-h-[70vh] flex items-center bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 w-full py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Partner With FarmyCure
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl text-white/90 mb-4"
              >
                Wholesale, Distribution & Strategic Business Collaborations
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
              >
                Scale your business with reliable farm-direct sourcing, transparent supply chains, and bulk organic produce solutions.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={scrollToForm}
                className="bg-[#1f4d36] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#163a2a] transition-colors"
              >
                Apply for Partnership
              </motion.button>
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-12 text-center"
            >
              Why Choose FarmyCure?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-[#1f4d36] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 bg-gray-50 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-12 text-center"
            >
              Our Wholesale Categories
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wholesaleCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-md border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-[#1f4d36] mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start">
                        <span className="w-2 h-2 bg-[#1f4d36] rounded-full mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Apply */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-12 text-center"
            >
              Who We Work With
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {targetBusinesses.map((business, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
                >
                  <span className="text-gray-700 font-medium">{business}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Application Form */}
        <section id="partnership-form" className="py-20 bg-gray-50 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-4 text-center"
            >
              Partnership Application Form
            </motion.h2>
            <p className="text-gray-600 text-center mb-12">
              Fill in your business details and our team will get back to you within 24-48 hours.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-10 shadow-lg text-center max-w-2xl mx-auto"
              >
                <div className="w-16 h-16 bg-[#1f4d36] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1f4d36] mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Thank you for your interest in partnering with FarmyCure. Our B2B team will contact you within 24–48 business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
                {/* Company Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1f4d36] mb-4 pb-2 border-b border-gray-200">
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      >
                        <option value="">Select Business Type</option>
                        {businessTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years in Operation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="yearsInOperation"
                        value={formData.yearsInOperation}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number
                      </label>
                      <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Registration Number
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1f4d36] mb-4 pb-2 border-b border-gray-200">
                    Contact Person
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Requirements */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1f4d36] mb-4 pb-2 border-b border-gray-200">
                    Business Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Products Interested In <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {productsList.map(product => (
                          <label key={product} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.productsInterested.includes(product)}
                              onChange={() => handleMultiSelect(product)}
                              className="w-4 h-4 text-[#1f4d36] border-gray-300 rounded focus:ring-[#1f4d36]"
                            />
                            <span className="text-sm text-gray-700">{product}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Monthly Order Volume <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="estimatedVolume"
                        value={formData.estimatedVolume}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      >
                        <option value="">Select Volume</option>
                        {volumeOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Packaging Type
                      </label>
                      <select
                        name="packagingPreference"
                        value={formData.packagingPreference}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      >
                        <option value="">Select Packaging</option>
                        {packagingOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Delivery Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="deliveryLocation"
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1f4d36] mb-4 pb-2 border-b border-gray-200">
                    Additional Details
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message / Requirements
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f4d36] focus:border-transparent"
                      placeholder="Tell us more about your business requirements..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1f4d36] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#163a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-[#1f4d36] px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              Reliable. Scalable. Sustainable.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-lg"
            >
              FarmyCure is building a future-ready agricultural supply network designed for long-term growth and responsible sourcing.
            </motion.p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Partners
