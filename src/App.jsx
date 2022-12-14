import React, { useEffect, useState} from "react";
import Header from "./components/Header";
import axios from "axios";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Cart from "./components/Cart/Cart";


export const AppContext = React.createContext({})

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
       /* fetch('https://63849b6b3fa7acb14ffa738d.mockapi.io/items')
            .then(response => {
                return response.json();
            }).then(json => {
            setItems(json);
        });*/
        async function fetchData() {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/cart'),
                    axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/favorites'),
                    axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/items')
                ])
                setIsLoading(false);
                setCartItems (cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const onClickCart = () => {
        setCartOpened(true);
    }
    const onClose = () => {
        setCartOpened(false);
    }
    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://63849b6b3fa7acb14ffa738d.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
                const {data} = await axios.post('https://63849b6b3fa7acb14ffa738d.mockapi.io/cart', obj);
                setCartItems((prev) => prev.map(item => {
                    if(item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item;
                }))
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
    }
    const onRemoveItem = async (id) => {
        try {
            await axios.delete(`https://63849b6b3fa7acb14ffa738d.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) =>Number (item.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении из корзины');
            console.error(error);
        }
    }
    const onAddToFavorite = async (obj) => {
        try {
            if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                await axios.delete(`https://63849b6b3fa7acb14ffa738d.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post('https://63849b6b3fa7acb14ffa738d.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data])
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
    const getAddedItems = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }

  return (
         <AppContext.Provider
             value= {{ items, cartItems,
             favorites, getAddedItems,
             onAddToFavorite, onClose,
             setCartItems, onAddToCart
             }} >
             <div className="wrapper clear">
                 { cartOpened && <Cart items={cartItems} onClose = {onClose} onRemoveItem={onRemoveItem}  /> }

                 <Header onClickCart = {onClickCart} />
                 <Routes>
                     <Route path="/favorites" element= {<Favorites />}></Route>

                     <Route path="/" element= { <Home searchValue={searchValue}
                                                      cartItems={cartItems}
                                                      onClearSearchInput={onClearSearchInput}
                                                      onChangeSearchInput={onChangeSearchInput}
                                                      items={items}
                                                      onAddToFavorite={onAddToFavorite}
                                                      onAddToCart={onAddToCart}
                                                      isLoading={isLoading}
                     />}
                     ></Route>

                 </Routes>
             </div>
         </AppContext.Provider>

  );
}

export default App;
