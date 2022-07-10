import React, { useReducer } from "react"

export const CartContext = React.createContext({
    cart: [],
    updateCart: () => { },
    clearCart: () => { },
    removeFromCart: () => { }
})

export default function CartProvider({ children, reducer, initialState }) {
    const [cartState, cartDispatch] = useReducer(reducer, initialState)

    const updateCart = (type, payload) => {
        cartDispatch({ type, payload })
    }

    const clearCart = () => {
        cartDispatch({ type: 'clear' })
    }

    const removeFromCart = (id) => {
        cartDispatch({type: 'remove', payload: id})
    }

    return <CartContext.Provider value={{ cart: cartState, updateCart, clearCart, removeFromCart }}>
        {children}
    </CartContext.Provider>
    
}

export const CartConsumer = CartContext.Consumer;