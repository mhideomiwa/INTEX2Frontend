import React, { useState } from 'react';
import { ProductItem } from '../../components';
import dummyData from "../../dummydata/dummydata.json";

const Products = ({ products }) => {
    // State to manage the current page
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Calculate total number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Calculate index range for current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to handle page navigation
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/*listing*/}
            <section className="pt-6">
                <div className="container">

                    {/*sort*/}
                    <div className="row gutter-1 align-items-end">
                        <div className="col-md-6">
                            <h1>All Sets</h1> {/* Change this to the category name dynamically */}
                        </div>
                        <div className="col-md-6 text-md-right">
                            <ul className="list list--horizontal list--separated text-muted fs-14">
                                <li>
                                    <span className="text-primary">{products.length} items</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/*products*/}
                    <div className="row gutter-1">
                        {/* Render each product using the ProductItem component */}
                        {currentProducts.map((product) => (
                            <ProductItem product={product} key={product.product_id} />
                        ))}
                    </div>

                    <div className="row">
                        <div className="col">
                            <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li className={`page-item ${index + 1 === currentPage ? 'active' : ''}`} key={index}>
                                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export async function getStaticProps() {
    const products = dummyData;
    return {
        props: {
            products,
        },
    };
}

export default Products;