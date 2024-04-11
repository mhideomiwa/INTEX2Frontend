import React, { useState } from 'react';

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

const ViewProducts = ({ products }) => {
    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div>
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

            <div className="row gutter-1">
                {products.map((product, index) => (
                    <ProductCard key={product.productId} product={product} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ViewProducts;
