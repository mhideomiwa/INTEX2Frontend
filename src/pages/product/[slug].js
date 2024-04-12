import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useStateContext } from "../../../context/StateContext";
import Link from "next/link";
import {BlockItem} from "../../../components";

const ProductDetails = () => {
    const router = useRouter();
    const { slug, id: productId } = router.query;
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { decQty, inQty, qty, onAdd, setShowCart } = useStateContext();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://intex2-backend.azurewebsites.net/api/Home/GetOneProduct?id=${productId}`);
                setProduct(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        const fetchRecommendedProducts = async () => {
            try {
                const response = await axios.get(`https://intex2-backend.azurewebsites.net/api/Home/GetOneContentFiltering?id=${productId}`);
                const recommendations = response.data;
                const recommendedProductsData = await Promise.all(
                    Object.entries(recommendations)
                        .filter(([key, value]) => key.startsWith('recommendation'))
                        .map(async ([key, recommendationId]) => {
                            const productResponse = await axios.get(`https://intex2-backend.azurewebsites.net/api/Home/GetOneProduct?id=${recommendationId}`);
                            return productResponse.data[0];
                        })
                );
                console.log('Recommended products:', recommendedProductsData)
                setRecommendedProducts(recommendedProductsData);
            } catch (error) {
                console.error('Error fetching recommended products:', error);
            }
        };


        if (productId) {
            fetchProduct();
            fetchRecommendedProducts();
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

    // Render recommended product cards
    const recommendedProductCards = recommendedProducts.map((recommendedProduct) => (
        <div className="card card-product" key={recommendedProduct.productId}>
            <figure className="card-image">
                <Link href={`/product/${recommendedProduct.slug}?id=${recommendedProduct.productId}`} className="action">
                    <img src={recommendedProduct.imgLink} alt="Image" />
                </Link>
            </figure>
            <Link href={`/product/${recommendedProduct.slug}?id=${recommendedProduct.productId}`} className="card-body">
                <h3 className="card-title">{recommendedProduct.name}</h3>
                <span className="price">${recommendedProduct.price}</span>
            </Link>
        </div>
    ));

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
                                    <button href="" className="btn btn-block btn-primary" onClick={() => onAdd(product,qty)}>Add to Cart</button>
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


                        </div>

                    </div>
                </div>
            </section>

            <section className="no-overflow">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>Recommended</h2>
                        </div>
                    </div>
                    <div className="row gutter-1">
                        {/* Render each product using the blockItem component */}
                        {recommendedProducts.map((product) => (
                            <BlockItem item={product} key={product.productId} />
                        ))}
                    </div>
                </div>
            </section>

            {/*<script src="/assets/js/vendor.min.js"></script>*/}
            {/*<script src="/assets/js/app.js"></script>*/}
        </div>
    );
};

export default ProductDetails;
