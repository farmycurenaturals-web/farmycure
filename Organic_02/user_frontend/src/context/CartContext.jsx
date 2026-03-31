import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
}

// Generate unique cart item key based on product id and selected options
const getCartItemKey = (item) => {
  const typePart = item.selectedType || item.selectedSubType || ''
  const qtyPart = item.selectedQuantity || ''
  return `${item.id}-${typePart}-${qtyPart}`
}

const calculateTotals = (items) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
})

const cartReducer = (state, action) => {
  let newItems

  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload
      const itemKey = getCartItemKey(product)

      const existingIndex = state.items.findIndex(
        (item) => getCartItemKey(item.product) === itemKey
      )

      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...state.items, { product, quantity }]
      }

      return { items: newItems, ...calculateTotals(newItems) }
    }

    case ACTIONS.REMOVE_FROM_CART: {
      const { itemKey } = action.payload
      newItems = state.items.filter(
        (item) => getCartItemKey(item.product) !== itemKey
      )
      return { items: newItems, ...calculateTotals(newItems) }
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const { itemKey, quantity } = action.payload
      if (quantity <= 0) {
        newItems = state.items.filter((item) => getCartItemKey(item.product) !== itemKey)
      } else {
        newItems = state.items.map((item) =>
          getCartItemKey(item.product) === itemKey ? { ...item, quantity } : item
        )
      }
      return { items: newItems, ...calculateTotals(newItems) }
    }

    case ACTIONS.CLEAR_CART:
      return { items: [], totalItems: 0, totalPrice: 0 }

    default:
      return state
  }
}

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = useCallback((product, quantity = 1) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: { product, quantity } })
  }, [])

  const removeFromCart = useCallback((itemKey) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { itemKey } })
  }, [])

  const updateQuantity = useCallback((itemKey, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { itemKey, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART })
  }, [])

  const getItemQuantity = useCallback(
    (product) => {
      const itemKey = getCartItemKey(product)
      const item = cart.items.find((item) => getCartItemKey(item.product) === itemKey)
      return item ? item.quantity : 0
    },
    [cart.items]
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity, getCartItemKey }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
