import React, {useEffect, useState} from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header";
import Cart from "./components/Cart";



function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(()=> {
        fetch('https://63849b6b3fa7acb14ffa738d.mockapi.io/items')
            .then(response => {
                return response.json();
            }).then(json => {
            setItems(json);
        });
    }, [])
    const onClickCart = () => {
        setCartOpened(true);
    }
    const onClose = () => {
        setCartOpened(false);
    }
    const onAddToCart = (obj) => {
     setCartItems(prev => [...prev, obj])
    }

  return (
    <div className="wrapper clear">
        { cartOpened && <Cart onClose = {onClose} items={cartItems} /> }
        <Header onClickCart = {onClickCart} />
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Все кроссовки</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt='Search'/>
                    <input placeholder="Поиск...."/>
                </div>
            </div>

            <div className="sneakers d-flex flex-wrap">
                {items.map((i)=>(
                    <Card
                        imageUrl = {i.imageUrl}
                        title = {i.title}
                        price={i.price}
                        onFavorite = {()=> console.log('Добавили закладки')}
                        onPlus = {(obj) => onAddToCart(obj)}
                    />
                ))
                }
            </div>
        </div>
    </div>
  );
}

export default App;
