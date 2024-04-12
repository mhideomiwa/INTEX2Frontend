import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs';
import {runFireworks} from "../../lib/utils";
import {useStateContext} from '../../context/StateContext'

const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext()

    useEffect(() => {
        localStorage.clear();
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runFireworks();
    }, [])

    return (
        <div className="container">
            <div className="text-center">

                <h2 className="alert-success">Thank you for your order!</h2>
                <p className={"email.msg"}>Check your email inbox for the confirmation.</p>
                <p className={"description"}>
                    If you have any questions please email: &nbsp;
                    <a className={"email"} href={"mailto:info@byu.edu"}>
                        kendricksemail@gmail.com
                    </a>
                </p>
                <Link href={"/"}>
                    <button type={"button"} width={"300px"} className="btn btn-success">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Success
