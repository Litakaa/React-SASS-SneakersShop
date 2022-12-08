import React from "react";


const Cart = ({onClose, items = [], onRemoveItem }) => {
    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className='d-flex justify-between mb-30'>Корзина
                    <img
                        onClick={onClose}
                        className='removeBtn cu-p'
                        src='/img/btn-remove.svg'
                        alt='Close'
                    />
                </h2>

                { items.length > 0 ? (
                        <div>
                            <div className='Items'>
                                {
                                    items.map((i) => (
                                        <div key={i.id} className='cartItem d-flex align-center mb-20'>
                                            <div
                                                style={{ backgroundImage: `url(${i.imageUrl})`}}
                                                className='cartItemImg'>
                                            </div>
                                            <div className='mr-20 flex'>
                                                <p className='mb-5'>{i.title}</p>
                                                <b>{i.price}</b>
                                            </div>
                                            <img
                                                onClick={ ()=> onRemoveItem(i.id) }
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
                        )
                        : (
                        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                            <img className='mb-20'
                                 width={120}
                                 height={120}
                                 src='/img/empty-cart.jpg'
                                 alt="RemoveItem"
                            />
                            <h2>Корзина пустая</h2>
                            <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
                            <button onClick={onClose} className="greenButton">
                                <img src='/img/arrow.svg' alt="Arrow"/>
                                Вернуться назад
                            </button>
                        </div>
                    )
                }



            </div>

        </div>
    );
}
export default Cart;