import React, {useEffect, useState} from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header";
import Cart from "./components/Cart";



function App() {
    const [items, setItems] = useState([])
    useEffect(()=> {
        fetch('https://63849b6b3fa7acb14ffa738d.mockapi.io/items')
            .then(response => {
                return response.json();
            }).then(json => {
            setItems(json);
        });
    }, [])
    const [cartOpened, setCartOpened] = useState(false);
    const onClickCart = () => {
        setCartOpened(true);
    }
    const onClose = () => {
        setCartOpened(false);
    }
  return (
    <div className="wrapper clear">
        { cartOpened && <Cart onClose = {onClose}/> }
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
                        onPlus = {()=> console.log('Нажали на плюс')}
                    />
                ))
                }
            </div>
        </div>
    </div>
  );
}

export default App;
