import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import IntroSplash from './components/splash/IntroSplash'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import ProductDetails from './pages/ProductDetails'
import Partners from './pages/Partners'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'partners', element: <Partners /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'order-success', element: <OrderSuccess /> },
    ],
  },
])

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <CartProvider>
      <AnimatePresence mode="wait">
        {showSplash && (
          <IntroSplash onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <RouterProvider router={router} />
      )}
    </CartProvider>
  )
}

export default App
