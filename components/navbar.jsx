import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {

    return (
        <header className="header header-absolute">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link href="/" className="navbar-brand order-1 order-lg-2"><h3 className={"text-red"}>Aurora Bricks</h3></Link>

                    <div className="collapse navbar-collapse order-4 order-lg-1" id="navbarMenu">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown dropdown-sm dropdown-hover">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown-1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item dropdown dropdown-lg dropdown-hover">
                                <Link className="nav-link dropdown-toggle" href="/products" id="navbarDropdown-2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="documentation.html">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse order-5 order-lg-3" id="navbarMenu2">
                        <ul className="navbar-nav ml-auto position-relative">

                            {/*/!*search*!/*/}
                            {/*<li className="nav-item dropdown dropdown-md dropdown-hover">*/}
                            {/*    <a className="nav-icon dropdown-toggle" id="navbarDropdown-4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                            {/*        <i className="icon-search d-none d-lg-inline-block"></i>*/}
                            {/*        <span className="d-inline-block d-lg-none">Search</span>*/}
                            {/*    </a>*/}
                            {/*    <div className="dropdown-menu" aria-labelledby="navbarDropdown-4">*/}
                            {/*        <div className="form-group">*/}
                            {/*            <input type="text" className="form-control" id="searchForm" placeholder="Search for items and brands" readOnly/>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}


                            {/*user area*/}
                            <li className="nav-item dropdown dropdown-md dropdown-hover">
                                <a className="nav-icon dropdown-toggle" id="navbarDropdown-6" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="icon-user d-none d-lg-inline-block"></i>
                                    <span className="d-inline-block d-lg-none">Account</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown-6">
                                    <div className="row gutter-2">
                                        <div className="col-12">
                                            <fieldset>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-label-group">
                                                            <input type="text" id="inputName" className="form-control form-control-lg" placeholder="Name" required="" value="Dumitru" readOnly/>
                                                                <label for="inputName">First Name</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-label-group">
                                                            <input type="text" id="inputSurname" className="form-control form-control-lg" placeholder="Surname" required="" readOnly/>
                                                                <label for="inputSurname">Surname</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="col-12 text-center">
                                            <a href="" className="underline fs-14">Forgot Password ?</a>
                                        </div>
                                        <div className="col-12">
                                            <a href="" className="btn btn-primary btn-block">Sign In</a>
                                            <a href="" className="btn btn-outline-secondary btn-block">Create Account</a>
                                        </div>
                                    </div>
                                </div>
                            </li>



                            {/*Cart*/}
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
                                            <div className="cart-item">
                                                <a href="" className="cart-item-image"><img src="assets/images/demo/product-1.jpg" alt="Image" /></a>
                                                <div className="cart-item-body">
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <h5 className="cart-item-title">Bold Cuff Insert Polo Shirt</h5>
                                                            <small>Fred Perry</small>
                                                            <ul className="list list--horizontal fs-14">
                                                                <li><s>$85.00</s></li>
                                                                <li className="text-red">$42.00</li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-3 text-right">
                                                            <ul className="cart-item-options">
                                                                <li><a href="" className="icon-x"></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <ul className="list-group list-group-minimal">
                                                <li className="list-group-item d-flex justify-content-between align-items-center text-uppercase font-weight-bold">
                                                    Subtotal
                                                    <span>$78.00</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-12">
                                            <a href="" className="btn btn-primary btn-block">Add all to cart</a>
                                            <a href="" className="btn btn-outline-secondary btn-block">View favorites</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="order-2 d-flex d-lg-none" id="navbarMenuMobile">
                        <ul className="navbar-nav navbar-nav--icons ml-auto position-relative">

                            {/*Search*/}
                            <li className="nav-item">
                                <a href="" className="nav-icon"><i className="icon-search"></i></a>
                            </li>

                            {/*cart*/}
                            <li className="nav-item dropdown dropdown-md dropdown-hover">
                                <a href="" className="nav-icon"><i className="icon-shopping-bag"></i></a>
                            </li>

                            {/*menu*/}
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
    )
}

export default Navbar