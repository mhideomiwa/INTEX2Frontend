import React from 'react';
import { useRouter } from 'next/router';
import dummyData from '../../../dummydata/dummydata.json';

const ProductDetails = ({ product }) => {
    const router = useRouter();
    const { slug } = router.query;
    const selectedProduct = product || dummyData.find(item => item.slug === slug);

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    const { product_ID, name, year, num_parts, price, img_link, primary_color, secondary_color, description, category } = selectedProduct;


    // const handleBuyNow = () => {
    //     onAdd(product, qty);
    //     setShowCart(true);
    // }

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
                                            <a href={img_link}><img src={img_link} alt="Image" /></a>
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
    )
}



//Get the data for the product from the slug that was clicked to get here
export async function getServerSideProps({ params }) {
    // Fetch data from your JSON file, database, or any other source based on the slug
    const { slug } = params;
    // You can fetch data from your JSON file here
    // For example:
    // const res = await fetch(`https://api.example.com/products/${slug}`);
    // const product = await res.json();

    // For demonstration, assuming you're fetching from a JSON file
    const product = dummyData.find(item => item.slug === slug);

    return {
        props: {
            product,
        },
    };
}
export default ProductDetails;
