import React, { useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";

const Checkout = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    window.location.href = "/thankyou";
  };

  return (
    <div className="">
      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <br />
              <h1>Checkout</h1>
            </div>
          </div>
          <div className="row gutter-1">
            <div className="col">
              <div className="bg-white p-2 p-lg-3 mb-1">
                <div className="row gutter-1 align-items-center">
                  <div className="col-md-6">
                    <h2 className="text-uppercase fs-20">Delivery Address</h2>
                  </div>
                </div>

                <fieldset className="mb-2">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputName2"
                          className="form-control form-control-lg"
                          placeholder="Name"
                          required=""
                          value=""
                        />
                        <label for="inputName">First Name</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputLastName"
                          className="form-control form-control-lg"
                          placeholder="LastName"
                          required=""
                        />
                        <label for="inputLastName">Last Name</label>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="mb-2">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputAddress"
                          className="form-control form-control-lg"
                          placeholder="Address"
                          required=""
                          value=""
                        />
                        <label for="inputAddress">Address</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputApt"
                          className="form-control form-control-lg"
                          placeholder="Apt, Suite, etc. (optional)"
                          required=""
                        />
                        <label for="inputApt">
                          Apt, Suite, etc. (optional)
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="mb-2">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputCity"
                          className="form-control form-control-lg"
                          placeholder="City"
                          required=""
                        />
                        <label for="inputCity">City</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="select-frame">
                        <select
                          className="custom-select custom-select-lg"
                          id="customSelect1"
                          data-placeholder="State"
                        >
                          <option label="state"></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputZip"
                          className="form-control form-control-lg"
                          placeholder="Zip"
                          required=""
                        />
                        <label for="inputZip">Zip</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="select-frame">
                        <select
                          className="custom-select custom-select-lg"
                          id="customSelect3"
                          data-placeholder="Country"
                        >
                          <option label="country"></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="bg-white p-2 p-lg-3 mb-1">
                <h2 className="mb-2 text-uppercase fs-20">Payment</h2>
                <fieldset className="mb-2">
                  <div className="row">
                    <div className="col">
                      <div className="select-frame">
                        <select
                          className="custom-select custom-select-lg"
                          id="customPayment"
                        >
                          <option value="1">Credit / Debit Card</option>
                          <option value="2">Paypal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="mb-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputCardNumber"
                          className="form-control form-control-lg"
                          placeholder="Card Number"
                          required=""
                        />
                        <label for="inputCardNumber">Card Number</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputExpiryDate"
                          className="form-control form-control-lg"
                          placeholder="Expiry Date (MM/YY)"
                          required=""
                        />
                        <label for="inputExpiryDate">Expiry date (MM/YY)</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputCvv"
                          className="form-control form-control-lg"
                          placeholder="CVV"
                          required=""
                        />
                        <label for="inputCvv">CVV</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputCardName"
                          className="form-control form-control-lg"
                          placeholder="Name on card"
                          required=""
                        />
                        <label for="inputCardName">Name on card</label>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <h3 className="mb-2 text-uppercase fs-16">We Accept</h3>
                <ul className="list list--horizontal">
                  <li>
                    <img
                      src="assets/images/demo/visa-1.svg"
                      className="payment"
                      alt="Image"
                    />
                  </li>
                  <li>
                    <img
                      src="assets/images/demo/master-card-1.svg"
                      className="payment"
                      alt="Image"
                    />
                  </li>
                  <li>
                    <img
                      src="assets/images/demo/amex-1.svg"
                      className="payment"
                      alt="Image"
                    />
                  </li>
                </ul>
              </div>

              <div className="bg-white p-2 p-md-3">
                <div className="btn btn-lg btn-primary btn-block mb-2" onClick={handleCheckout}>
                  Place Order
                </div>
                <small className="text-muted">
                  By placing your order you agree to our{" "}
                  <a href="">Terms & Conditions</a>, privacy and returns
                  policies. You also consent to some of your data being stored
                  by Aurora Bricks, which may be used to make future shopping
                  experiences better for you.
                </small>
              </div>
            </div>

            <aside className="col-lg-5">
              <div className="bg-white p-2 p-lg-3">
                <h2 className="mb-3 text-uppercase fs-20">Order total</h2>

                {cartItems.map((item) => (
                  <div className="cart-item-body">
                    <div key={item._id} className="cart-item col-12">
                      <div>
                        <img src={item.imgLink} alt="Image" className="img" />
                      </div>
                      <div>
                        <h5 className="cart-item-title">{item.name}</h5>
                        <ul className="list fs-14">
                          <li>
                            <p>${item.price}</p>
                          </li>
                          <li>
                            <p>Quantity: {item.quantity}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="col-2 align-items-xl-end">
                        <ul className="list-group-horizontal">
                          <li>
                            <button
                              className="btn btn-group-square"
                              onClick={() =>
                                toggleCartItemQuantity(item.productId, "dec")
                              }
                            >
                              <i className={"icon-minus"} />
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn btn-group-square"
                              onClick={() =>
                                toggleCartItemQuantity(item.productId, "inc")
                              }
                            >
                              <i className="icon-plus" />
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="col-4 text-right">
                        <ul className="cart-item-options">
                          <li>
                            <a
                              type="button"
                              onClick={() => onRemove(item)}
                              className="icon-x"
                            ></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                <hr className="my-3" />
                <ul className="list-group list-group-minimal">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Items
                    <span></span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center text-uppercase font-weight-bold">
                    Total to pay
                    <span>${totalPrice}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {cartItems.length < 1 && (
        <div className="col-12">
          <h3>Your shopping cart is empty</h3>
          <Link href="/">
            <button type="button" className="btn btn-primary">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
