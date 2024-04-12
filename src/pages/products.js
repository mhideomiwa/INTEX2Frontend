import React, { useState } from 'react';
import { ProductItem } from '../../components';
import dummyData from "../../dummydata/dummydata.json";

const Products = ({ products }) => {
    // State to manage the current page and items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);

    // Calculate total number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Calculate index range for current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to handle page navigation
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle change in items per page
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setProductsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

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
                                    <span>
                                        <form>
                                            Items per page:
                                            <select name="itemsPerPage" id="itemsPerPage" onChange={handleItemsPerPageChange} value={productsPerPage} className="select-frame">
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                            </select>
                                        </form>
                                    </span>
                                </li>
                                {/* <li>
                                    <span className="text-primary">/{products.length} items</span>
                                </li> */}
                            </ul>
                        </div>
                    </div>

                    {/*products*/}
                    <div className="productContainer">
                        {/* Render each product using the ProductItem component */}
                        {currentProducts.map((product) => (
                            <ProductItem product={product} key={product.productId} />
                        ))}
                    </div>

                    <div className="row">
                        <div className="col">
                            <nav aria-label="Page navigation" style={{ display: 'flex', justifyContent: 'center'}}>
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
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const res = await
        fetch(process.env.API_URI + "/api/Home/GetAllProducts");
    const allProducts = await res.json();
    return {
        props: {
            products: allProducts
        },
    }
}

export default Products;
