import React, { useState} from "react";
import Info from "../Info";
import axios from "axios";
import {useCart} from "../../hooks/useCart";
import style from "./Cart.module.scss"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Cart = ({onClose, onRemoveItem, items = [] }) => {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://63849b6b3fa7acb14ffa738d.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://63849b6b3fa7acb14ffa738d.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
    };
    return (
        <div className={style.overlay}>
            <div className={style.drawer}>
                <h2 className='d-flex justify-between mb-30'>Корзина
                    <img
                        onClick={onClose}
                        className='removeBtn cu-p'
                        src='/img/btn-remove.svg'
                        alt='Close'
                    />
                </h2>

                { items.length > 0 ? (
                        <div className='d-flex flex-column flex'>
                            <div className='Items flex'>
                                {
                                    items.map((item) => (
                                        <div key={item.id} className='cartItem d-flex align-center mb-20'>
                                            <div
                                                style={{ backgroundImage: `url(${item.imageUrl})`}}
                                                className='cartItemImg'>
                                            </div>
                                            <div className='mr-20 flex'>
                                                <p className='mb-5'>{item.title}</p>
                                                <b>{item.price} руб.</b>
                                            </div>
                                            <img
                                                onClick={ ()=> onRemoveItem(item.id) }
                                                className='removeBtn'
                                                src='/img/btn-remove.svg'
                                                alt='Remove'/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='cartTotalBlock'>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{Math.ceil(totalPrice / 100 * 5 )} руб. </b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ
                                    <img src='/img/arrow.svg' alt="Arrow"/>
                                </button>
                            </div>
                        </div>
                        )
                        : (
                            <Info title={ isOrderComplete ? "Заказ оформлен" : "Корзина пустая" }
                                  description={ isOrderComplete
                                      ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                      : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'}
                                  image={ isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                            />
                    )
                }



            </div>

        </div>
    );
}
export default Cart;