import React, { useState, useEffect } from 'react';

function editProduct(product) {
    console.log('Edit:', product);
}

function deleteProduct(product) {
    console.log('Delete:', product);
}

const ProductCard = ({ product, index }) => {
    const [showModal, setShowModal] = useState(false);
    const modalId = `deleteProductModal_${index}`;

    const handleDeleteClick = () => {
        console.log('showModal:', showModal);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="col-4" key={product.productId}>
            <div className="card h-100">
                <div className="card-body d-flex flex-column">
                    <img src={product.imgLink} alt="Image" className="card-img" />
                    <div className="mt-auto">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">${product.price}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => editProduct(product)}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show" id={modalId} tabIndex="-1" role="dialog" aria-labelledby={`${modalId}_label`} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`${modalId}_label`}>Delete Product</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this product?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ViewProducts = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle change in items per page
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setProductsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://intex2-backend.azurewebsites.net/api/Home/GetAllProducts"); // Adjust the endpoint accordingly
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>View/Edit Products</h1>
            <div className="row">
                <div className="col-12">
                    <span className="label">Filter</span>
                </div>
            </div>
            <fieldset className="mb-2">
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="filter" className="form-control form-control-lg" placeholder="Transaction Id, Date, Address, Subtotal" />
                            <label htmlFor="filter">Search by: Product Id, Product Name, Price</label>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div className="row gutter-1 align-items-end">
                <div className="col-md-6 text-md-right">
                    <ul className="list list--horizontal list--separated text-muted fs-14">
                        <li>
                            <span>
                                <form>
                                    Items per page:
                                    <select name="itemsPerPage" id="itemsPerPage" onChange={handleItemsPerPageChange} value={productsPerPage} className="select-frame">
                                        <option value="5" className='selector'>5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </select>
                                </form>
                            </span>
                        </li>
                        <li>
                            <span className="text-primary">/{products.length} items</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="row gutter-1">
                {currentProducts.map((product, index) => (
                    <ProductCard key={product.productId} product={product} index={index} />
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
        </>
    );
};

export default ViewProducts;
