import React, {useState} from "react";
import style from './Card.module.scss'


const Card = ({ imageUrl, title, price, onFavorite, onPlus}) => {
    const [isAdded, setIsAdded] = useState(false);
    const onClickPlus = () => {
        onPlus({imageUrl, title, price});
        setIsAdded(!isAdded);
    }
    return (
        <div className={style.card}>
            <div className={style.favorite} onClick={onFavorite}>
                <img src='/img/unliked.svg' alt='Unliked'/>
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

