import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import CartIcon from './CartIcon'
import { Container } from '../ui/Container'
import Logo from '../../assets/icons/Logo.svg'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isScrolled } = useScrollPosition()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const shouldBeTransparent = isHomePage && !isScrolled
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <>
      <header
        className={`
          sticky top-0 z-50
          transition-all duration-300
          ${shouldBeTransparent 
            ? 'bg-transparent' 
            : 'bg-white shadow-md'
          }
        `}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={Logo} 
                alt="FarmyCure Logo"
                className={`h-9 transition-colors duration-300 ${shouldBeTransparent ? 'brightness-0 invert' : ''}`}
              />
              <span
                className={`
                  text-lg font-semibold tracking-wide
                  transition-colors duration-300
                  ${shouldBeTransparent ? 'text-white' : 'text-[#1f4d36]'}
                `}
              >
                FarmyCure Naturals
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLinks isTransparent={shouldBeTransparent} />
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className={`text-sm font-medium ${shouldBeTransparent ? 'text-white' : 'text-forest'}`}
                >
                  Logout ({user?.role})
                </button>
              ) : (
                <Link to="/login" className={`text-sm font-medium ${shouldBeTransparent ? 'text-white' : 'text-forest'}`}>
                  Login
                </Link>
              )}
              <CartIcon isTransparent={shouldBeTransparent} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2"
              aria-label="Open menu"
            >
              <svg
                className={`w-6 h-6 transition-colors duration-300 ${
                  shouldBeTransparent ? 'text-white' : 'text-forest'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

          </nav>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}

export default Navbar
