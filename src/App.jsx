import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Cart from "./components/Cart";


function App() {
  return (
    <div className="wrapper clear">
        <Cart/>
        <Header/>
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Все кроссовки</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt='Search'/>
                    <input placeholder="Поиск...."/>
                </div>
            </div>

            <div className="sneakers d-flex">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    </div>
  );
}

export default App;
