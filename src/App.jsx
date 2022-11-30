import React, {useEffect, useState} from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header";
import Cart from "./components/Cart";
import axios from "axios";


function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(()=> {
       /* fetch('https://63849b6b3fa7acb14ffa738d.mockapi.io/items')
            .then(response => {
                return response.json();
            }).then(json => {
            setItems(json);
        });*/
        axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/items').then(response => {
            setItems(response.data) });
        axios.get('https://63849b6b3fa7acb14ffa738d.mockapi.io/cart').then(response => {
            setCartItems (response.data) });
    }, [])
    const onClickCart = () => {
        setCartOpened(true);
    }
    const onClose = () => {
        setCartOpened(false);
    }
    const onAddToCart = (obj) => {
        axios.post('https://63849b6b3fa7acb14ffa738d.mockapi.io/cart', obj);
     setCartItems(prev => [...prev, obj])
    }
    const onRemoveItem = (id) => {
        /*axios.delete(`https://63849b6b3fa7acb14ffa738d.mockapi.io/cart/${id}`)*/
        setCartItems(prev => prev.filter(i => i.id !== id))
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
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1> { searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'} </h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt='Search'/>
                    { searchValue && ( <img
                        onClick={onClearSearchInput}
                        className='clear cu-p'
                        src='/img/btn-remove.svg'
                        alt='Clear'/>
                    )}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск...."/>
                </div>
            </div>

            <div className="sneakers d-flex flex-wrap">
                {items
                    .filter((i) => i.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((i)=>(
                    <Card
                        key = {i.imageUrl}
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
