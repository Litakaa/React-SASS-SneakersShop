import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {useCart} from "../hooks/useCart";

const Header =(props) => {
    const {totalPrice} = useCart();

    return (
        <header className='d-flex justify-between align-center'>
            <NavLink to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src='/img/logo.png' alt='logo'/>
                    <div>
                        <h3 className='text-uppercase'>Sneakers Shop</h3>
                        <p className='opacity-5'>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </NavLink>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={20} height={20} src='/img/cart.svg' alt="Корзина"/>
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-20 cu-p">
                   <NavLink to='/favorites'>
                       <img width={20} height={20} src='/img/heart.svg' alt="Закладки"/>
                   </NavLink>
                </li>
                <li>
                        <img width={20} height={20} src='/img/user.svg' alt="Пользователь"/>

                </li>
            </ul>
        </header>

    );
}

export default Header;