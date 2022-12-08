import React from "react";
import Card from "../components/Card/Card";


const Home = ({ searchValue,
                  onClearSearchInput,
                  onChangeSearchInput,
                  items, onAddToFavorite,
                  onAddToCart,
                  cartItems}) =>
            {
    return (
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
                    .map((i, index)=>(
                        <Card
                            key = {index}
                            id ={i.id}
                            imageUrl = {i.imageUrl}
                            title = {i.title}
                            price={i.price}
                            onFavorite = {(product)=>onAddToFavorite(product)}
                            onPlus = {(product) => onAddToCart(product)}
                            added = {cartItems.some((product) => Number(product.id) === Number(i.id))}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Home;