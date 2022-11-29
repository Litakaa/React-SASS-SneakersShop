import React from "react";


const Cart = ({onClose, items = [] }) => {
    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className='d-flex justify-between mb-30'>Корзина
                    <img onClick={onClose} className='removeBtn cu-p' src='/img/btn-remove.svg' alt='Close'/>
                </h2>

                <div className='Items'>
                    {
                        items.map((i) => (
                            <div  className='cartItem d-flex align-center'>
                                <div
                                    style={{ backgroundImage: `url(${i.imageUrl})`}}
                                    className='cartItemImg'>
                                </div>
                                <div className='mr-20 flex'>
                                    <p className='mb-5'>{i.title}</p>
                                    <b>{i.price}</b>
                                </div>
                                <img className='removeBtn' src='/img/btn-remove.svg' alt='Remove'/>
                            </div>
                        ))
                    }
                </div>
                <div className='cartTotalBlock'>
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб. </b>
                        </li>
                        <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>1074 руб. </b>
                        </li>
                    </ul>
                    <button className="greenButton">Оформить заказ
                        <img src='/img/arrow.svg' alt="Arrow"/>
                    </button>
                </div>

            </div>

        </div>
    );
}
export default Cart;