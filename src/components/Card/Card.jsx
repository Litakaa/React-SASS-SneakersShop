import React, {useState} from "react";
import style from './Card.module.scss'


const Card = (props) => {
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        setIsAdded(!isAdded);
    }


    return (
        <div className={style.card}>
            <div className={style.favorite} onClick={props.onFavorite}>
                <img src='/img/unliked.svg' alt='Unliked'/>
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="Sneakers"/>
            <h5>{props.title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>ЦЕНА:</span>
                    <b>{props.price}</b>
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

