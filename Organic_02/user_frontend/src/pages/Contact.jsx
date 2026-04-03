import { useState } from 'react'
import { Container } from '../components/ui/Container'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <main className="py-16 md:py-24 bg-background min-h-[60vh]">
      <Container>
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Contact Us
          </h1>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to our team and 
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="max-w-6xl mx-auto px-4 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Location */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="font-semibold text-lg text-[#1f4d36]">Location</h3>
              <p className="text-gray-600 text-sm mt-2">
                Andhra Pradesh, India
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-2xl mb-3">📞</div>
              <h3 className="font-semibold text-lg text-[#1f4d36]">Phone</h3>
              <p className="text-gray-600 text-sm mt-2">
                +91 98765 43210
              </p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-2xl mb-3">📧</div>
              <h3 className="font-semibold text-lg text-[#1f4d36]">Email</h3>
              <p className="text-gray-600 text-sm mt-2">
                support@farmycure.com
              </p>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-2xl mb-3">🌐</div>
              <h3 className="font-semibold text-lg text-[#1f4d36]">Follow Us</h3>
              <p className="text-gray-600 text-sm mt-2">
                Instagram | LinkedIn
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1f4d36] text-white py-3 rounded-lg font-medium hover:bg-[#173c2b] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </Container>
    </main>
  )
}

export default Contact
