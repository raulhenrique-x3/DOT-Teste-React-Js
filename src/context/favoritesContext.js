import React, { useReducer } from "react"


export const FavContext = React.createContext({
    favorites: [],
    updateFavorites: () => { },
    clearFavorites: () => { },
    removeFavorites: () => { },
})

export default function FavoritesProvider({ children, reducer, initialState }) {
    const [favoritesState, favoritesDispatch] = useReducer(reducer, initialState)

    const updateFavorites = (type, payload) => {
        favoritesDispatch({ type, payload })
    }

    const clearFavorites = () => {
        favoritesDispatch({ type: 'clear' })
    }

    const removeFavorites = (id) => {
        favoritesDispatch({ type: 'remove', payload: id })
    }

    return <FavContext.Provider value={{ favorites: favoritesState, updateFavorites, clearFavorites, removeFavorites }}>
        {children}
    </FavContext.Provider>

}

export const FavoriteConsumer = FavContext.Consumer;