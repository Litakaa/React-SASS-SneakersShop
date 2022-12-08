import React from "react";
import Card from "../components/Card/Card";


const Favorites = ({items, onAddToFavorite}) => {
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1> Мои закладки </h1>

            </div>

            <div className="sneakers d-flex flex-wrap">
                {
                    items.map((i, index) =>(
                        <Card  key = {index}
                               id ={i.id}
                               imageUrl = {i.imageUrl}
                               title = {i.title}
                               price={i.price}
                               favorited={true}
                               onFavorite={onAddToFavorite}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Favorites;