import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import CartIcon from './CartIcon'
import { slideInRight } from '../../animations/variants'
import { useAuth } from '../../context/AuthContext'

const MobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth()
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Link to="/" onClick={onClose}>
                  <span className="font-heading text-xl font-bold text-forest">
                    GreenHarvest
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 text-text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <NavLinks onClick={onClose} />
                <div className="mt-4">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        logout()
                        onClose()
                      }}
                      className="text-sm font-medium text-forest"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" onClick={onClose} className="text-sm font-medium text-forest">
                      Login
                    </Link>
                  )}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-gray-500">
                    Your Cart
                  </span>
                  <CartIcon onClick={onClose} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
