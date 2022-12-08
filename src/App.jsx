import React, {useEffect, useState} from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header";
import Cart from "./components/Cart";
import axios from "axios";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(()=> {
       /* fetch('https://63849b6b3fa7acb14ffa738d.mockapi.io/items')
            .then(response => {
                return response.json();
            }).then(json => {
            setItems(json);
        });*/
        async function fetchData() {
            const cartResponse = await axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/favorites');
            const itemsResponse =  await axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/items');

            setCartItems (cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
        }
        fetchData();
    }, [])
    const onClickCart = () => {
        setCartOpened(true);
    }
    const onClose = () => {
        setCartOpened(false);
    }
    const onAddToCart = (product) => {
       try {
            if(cartItems.find((item)=> Number(item.id) === Number(product.id))) {
                axios.delete(`https://63849b6b3fa7acb14ffa738d.mockapi.io/cart/${product.id}`);
             setCartItems(prev => prev.filter(item => Number(item.id) !== Number(product.id)))
            } else {
                axios.post('https://63849b6b3fa7acb14ffa738d.mockapi.io/cart', product);
                setCartItems(prev => [...prev, product])
           }
       } catch (error) {
       }
    }
    const onRemoveItem = (id) => {
        axios.delete(`https://63849b6b3fa7acb14ffa738d.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(i => i.id !== id))
    }
    const onAddToFavorite = async (product) => {
        try {
            if(favorites.find((favProduct) => favProduct.id === product.id)) {
                axios.delete(`https://63849b6b3fa7acb14ffa738d.mockapi.io/favorites/${product.id}`);
            } else {
                const {data} = await axios.post('https://63849b6b3fa7acb14ffa738d.mockapi.io/favorites', product);
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в избранное')
        }
    }
    const onChangeSearchInput = (event) => {
       setSearchValue(event.target.value)
    }
    const onClearSearchInput = () => {
        setSearchValue('')
    }

  return (
          <div className="wrapper clear">
              { cartOpened && <Cart onClose = {onClose} items={cartItems} onRemoveItem={onRemoveItem}  /> }
               <Header onClickCart = {onClickCart} />
              <Routes>
                  <Route path="/favorites" element= {<Favorites items = {favorites} onAddToFavorite={onAddToFavorite} />}></Route>
                  <Route path="/" element= { <Home searchValue={searchValue}
                                                   cartItems = {cartItems}
                                                  onClearSearchInput={onClearSearchInput}
                                                  onChangeSearchInput={onChangeSearchInput}
                                                  items={items}
                                                  onAddToFavorite={onAddToFavorite}
                                                  onAddToCart={onAddToCart} /> }
                  ></Route>
              </Routes>
          </div>

  );
}

export default App;
