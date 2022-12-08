import React, {useState} from "react";
import style from './Card.module.scss'


const Card = ({ id, imageUrl, title, price, onFavorite, onPlus, favorited = false, added = false}) => {
    const [isAdded, setIsAdded] = useState(added);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        const product = { id, imageUrl, title, price}
        onPlus(product);
        setIsAdded(!isAdded);
    }
    const onClickFavorite = () => {
        const product = {id, imageUrl, title, price}
        onFavorite(product);
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={style.card}>
            <div className={style.favorite} onClick={onClickFavorite}>
                <img  src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt='Unliked'/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>ЦЕНА:</span>
                    <b>{price}</b>
                </div>
                <img className={style.plus}
                     onClick={onClickPlus}
                     src= {isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg" }
                     alt="Plus"
                />
            </div>
        </div>
    );
}
export default Card;

