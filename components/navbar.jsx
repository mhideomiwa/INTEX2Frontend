import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../context/StateContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

function CartItem({ item }) {
    return (
        <div className="cart-item">
            <a href="" className="cart-item-image">
                <img src={item.imgLink} alt="Image" />
            </a>
            <div className="cart-item-body">
                <div className="row">
                    <div className="col-9">
                        <h5 className="cart-item-title">{item.name}</h5>
                        <ul className="listfs-14">
                            <li>Quantity {item.quantity}</li>
                        </ul>
                        <ul className="list list--horizontal fs-14">
                            <li>${item.price}</li>
                        </ul>
                    </div>
                    <div className="col-3 text-right">
                        <ul className="cart-item-options">
                            <li>
                                <a href="" className="icon-x"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Navbar = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, qty } = useStateContext();
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        // Check if email exists in sessionStorage
        const email = sessionStorage.getItem('email');
        if (email) {
            if (email === 'admin@byu.edu') {
                setAdmin(true);
            }
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }


    }, []);

    const handleLogout = () => {
        // Clear sessionStorage
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("expiresAt");
        // Update loggedIn state
        setAdmin(false)
        setLoggedIn(false);
        router.push('/');
    };

    return (
        <header className="header header-absolute">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link href="/" className="navbar-brand order-1 order-lg-2">
                        <h3 className={'text-red'}>Aurora Bricks</h3>
                    </Link>

                    <div className="collapse navbar-collapse order-4 order-lg-1" id="navbarMenu">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown dropdown-sm dropdown-hover">
                                <Link className="nav-link dropdown-toggle" href="/" id="navbarDropdown-1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown dropdown-lg dropdown-hover">
                                <Link className="nav-link dropdown-toggle" href="/products" id="navbarDropdown-2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/aboutus">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse order-5 order-lg-3" id="navbarMenu2">
                        <ul className="navbar-nav ml-auto position-relative">
                            {/* User area */}
                            {loggedIn ? (
                                <li className="nav-item dropdown dropdown-md dropdown-hover">
                                    <span className="nav-icon">Welcome {sessionStorage.getItem('email')}!</span>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown-8">
                                        <div className="row gutter-3">
                                            <div className="col-8 btn" onClick={handleLogout}>
                                                <h3 className="eyebrow text-dark fs-16 mb-0">Log Out</h3>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <li className="nav-item dropdown dropdown-md dropdown-hover">
                                    <Link className="nav-icon dropdown-toggle" href="/login">
                                        <i className="icon-user d-none d-lg-inline-block"></i>
                                        <span className="d-inline-block d-lg-none">Account</span>
                                    </Link>
                                </li>
                            )}

                            {/* Cart */}
                            <li className="nav-item dropdown dropdown-md dropdown-hover">
                                <a className="nav-icon dropdown-toggle" id="navbarDropdown-8" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="icon-shopping-bag d-none d-lg-inline-block"></i>
                                    <span className="d-inline-block d-lg-none">Bag</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown-8">
                                    <div className="row gutter-3">
                                        <div className="col-12">
                                            <h3 className="eyebrow text-dark fs-16 mb-0">My Bag</h3>
                                        </div>
                                        <div className="col-12">
                                            {cartItems.length < 1 && <div className="empty-cart">Your Cart is Empty</div>}

                                            {cartItems.length >= 1 && cartItems.map((item) => (
                                                <CartItem key={item.productId} item={item} />
                                            ))}
                                        </div>
                                        <div className="col-12">
                                            <ul className="list-group list-group-minimal">
                                                <li className="list-group-item d-flex justify-content-between align-items-center text-uppercase font-weight-bold">
                                                    Subtotal
                                                    <span>${totalPrice}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-12">
                                            <Link href="/checkout" className="btn btn-primary btn-block">
                                                Check Out
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {admin && (
                                <li className="nav-item dropdown dropdown-md dropdown-hover">
                                    <Link className="nav-icon dropdown-toggle" href="/admin">

                                        Admin
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </div>

                    {/* Admin area */}


                    {/* Mobile menu */}

                    <div className="order-2 d-flex d-lg-none" id="navbarMenuMobile">
                        <ul className="navbar-nav navbar-nav--icons ml-auto position-relative">
                            {/* Search */}
                            <li className="nav-item">
                                <a href="" className="nav-icon">
                                    <i className="icon-search"></i>
                                </a>
                            </li>

                            {/* Cart */}
                            <li className="nav-item dropdown dropdown-md dropdown-hover">
                                <a href="" className="nav-icon">
                                    <i className="icon-shopping-bag"></i>
                                </a>
                            </li>

                            {/* Menu */}
                            <li className="nav-item dropdown dropdown-md dropdown-hover">
                                <a href="" className="nav-icon" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="icon-menu"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
