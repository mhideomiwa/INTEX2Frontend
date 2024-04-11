import React, { useRef } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useStateContext } from '../../context/StateContext';

const Checkout = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

    const handleCheckout = async () => {
        console.log('Checkout');
    }

    return (
        <div className="container">
            <h1>
                Shopping Cart
            </h1>

            {cartItems.length < 1 && (
                <div className='col-12'>
                    <h3>Your shopping cart is empty</h3>
                    <Link href="/">
                        <button
                            type="button"
                            className="btn btn-primary"
                        >
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            )}

            {cartItems.map((item) => (
                <div key={item._id} className="cart-item col-12">
                    <div>
                        <img src={item.imgLink} alt="Image" className="img" />
                    </div>
                    <div>
                        <h5>{item.name}</h5>
                        <ul>
                            <li>Quantity: {item.quantity}</li>
                        </ul>
                        <ul>
                            <li>${item.price}</li>
                        </ul>
                    </div>
                    <div className="col-2 align-items-xl-end">
                        <ul className="list-group-horizontal">
                            <li>
                                <button className="btn btn-group-square" onClick={() => toggleCartItemQuantity(item.productId, 'inc')}>
                                    <i className={"icon-minus"} onClick={() => toggleCartItemQuantity(item.productId, 'dec')}/>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-group-square" onClick={() => toggleCartItemQuantity(item.productId, 'inc')}>
                                    <i className="icon-plus" />
                                </button>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => onRemove(item)}
                                >
                                    Remove
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Checkout