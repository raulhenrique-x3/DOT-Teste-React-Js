import Header from './components/Header/Header';
import Section01 from './components/Section01/Section01';
import Form from './components/Form/Form';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { cartReducer, initialCart } from './context/cartReducer';
import { favoritesReducer, initialFavorites } from './context/favoritesReducer'
import CartProvider from './context/cartContext';
import FavoritesProvider from './context/favoritesContext';
import routes from './const/routes';


function App() {
  return (
    <FavoritesProvider reducer={favoritesReducer} initialState={initialFavorites}>
      <CartProvider reducer={cartReducer} initialState={initialCart}>
        <div className="App">
          <div className='content'>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route exact path='/' element={<Section01 />} />
                <Route path={routes.Form} element={<Form />} />
                {/* <Route path='*' element={<NotFound />} /> */}
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </CartProvider>
    </FavoritesProvider>


  );
}

export default App;
