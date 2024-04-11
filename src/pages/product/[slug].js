import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {useStateContext} from "../../../context/StateContext";
//TODO: Replace the localhost with the actual API URL before pushing to prod


const ProductDetails = () => {
    const router = useRouter();
    const { slug, id: productId } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log('UseStateContext', useStateContext())
    const{decQty, inQty, qty, onAdd, setShowCart} = useStateContext();



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // const response = await axios.get(`https://intex2-backend.azurewebsites.net/api/Home/GetOneProduct?id=${productId}`);
                const response = await axios.get(`https://localhost:7102/api/Home/GetOneProduct?id=${productId}`);
                setProduct(response.data[0]);
                console.log("RESPONSE:", response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return (
            <div className="container container-full">
                <h1>Product not found</h1>
            </div>
        );
    }

    const { name, num_parts, price, imgLink, description, category } = product;

    return (
        <div>
            {/*product*/}
            <section className="hero py-9">
                <div className="container">
                    <div className="row gutter-2 gutter-md-4 justify-content-between">


                        {/*carousel*/}
                        <div className="col-lg-7">
                            <div className="row gutter-1 justify-content-between">
                                <div className="col-lg-10 order-lg-2">
                                    <div className="align-items-center">
                                        <figure className="text-center">
                                            <a href={imgLink}><img src={imgLink} alt="Image" /></a>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-5 mb-lg-0">

                            {/*description*/}
                            <div className="row">
                                <div className="col-12">
                                    <span className="eyebrow text-muted">{category}</span>
                                    <h1>{name}</h1>
                                    <span className="price fs-18">${price}</span>
                                    <br/>
                                    <span className="fs-14 text-muted">{num_parts} pieces</span>
                                </div>
                            </div>

                            <div className="row gutter-2">
                                <div className="col-12">
                                    <a href="" className="btn btn-block btn-primary">Add to Cart</a> {/*Make this button work*/}
                                </div>
                            </div>

                            {/*accordion*/}
                            <div className="row">
                                <div className="col">
                                    <div className="accordion" id="accordion">
                                        <div className="card">
                                            <div className="card-header">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Product Details
                                                    </button>
                                                </h2>
                                            </div>

                                            <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>{description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*do we want these?*/}
                            {/*<div className="form-group">*/}
                            {/*    <label>Share this product</label>*/}
                            {/*    <div>*/}
                            {/*        <ul className="list list--horizontal">*/}
                            {/*            <li><a href="" className="text-hover-facebook"><i className="fs-28 icon-facebook-square-brands"></i></a></li>*/}
                            {/*            <li><a href="" className="text-hover-instagram"><i className="fs-28 icon-instagram-square-brands"></i></a></li>*/}
                            {/*            <li><a href="" className="text-hover-twitter"><i className="fs-28 icon-twitter-square-brands"></i></a></li>*/}
                            {/*            <li><a href="" className="text-hover-pinterest"><i className="fs-28 icon-pinterest-square-brands"></i></a></li>*/}
                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
            </section>

            <script src="/assets/js/vendor.min.js"></script>
            <script src="/assets/js/app.js"></script>
        </div>
    );
};

export default ProductDetails;
