import React from 'react';

function EditProductModal({ product, handleChange, editProduct, handleCloseEditModal }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange({ ...product, [name]: value });
    };
    
    return (
        <div className="modal">
            <div className="modal-dialog py-7" role="document">
                <div className="modal-content border-dark py-2">
                    <div className="col-12">
                        <fieldset>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="inputProductName"
                                            className="form-control form-control-lg"
                                            placeholder="Product Name"
                                            name="name"
                                            defaultValue={product.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="inputProductName">Product Name</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="number"
                                            id="inputProductYear"
                                            className="form-control form-control-lg"
                                            placeholder="Product Year"
                                            name="year"
                                            defaultValue={product.year}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="inputProductYear">Product Year</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="number"
                                            id="inputPrice"
                                            className="form-control form-control-lg"
                                            placeholder="Price"
                                            defaultValue={product.price}
                                            onChange={handleChange}
                                            name="price"
                                            required
                                        />
                                        <label htmlFor="inputPrice">Price</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="inputCount"
                                            className="form-control form-control-lg"
                                            placeholder="Piece Count"
                                            name="numParts"
                                            defaultValue={product.numParts}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="inputCount">Piece Count</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="inputDescription"
                                            className="form-control form-control-lg"
                                            placeholder="Description"
                                            name="description"
                                            defaultValue={product.description}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="inputDescription">Description</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="imgLink"
                                            className="form-control form-control-lg"
                                            placeholder="Image Link"
                                            name="imgLink"
                                            defaultValue={product.imgLink}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="imgLink">Image Link</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="pirmaryColor"
                                            className="form-control form-control-lg"
                                            placeholder="Primary Color"
                                            name="primaryColor"
                                            defaultValue={product.primaryColor}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="pirmaryColor">Primary Color</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="secondaryColor"
                                            className="form-control form-control-lg"
                                            placeholder="Secondary Color"
                                            name="secondaryColor"
                                            defaultValue={product.secondaryColor}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="secondaryColor">Secondary Color</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="category"
                                            className="form-control form-control-lg"
                                            placeholder="Category"
                                            name="category"
                                            defaultValue={product.category}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="category">Category</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-12 text-center">
                        <button className="btn btn-warning btn-block" onClick={handleCloseEditModal}>Cancel</button>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary btn-block" onClick={editProduct}>Edit Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProductModal;