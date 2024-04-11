import React, { useState } from 'react';

function addProduct(product) {
    console.log('Add:', product);
}

function AddProducts() {
    return (
        <div className="row gutter-2">
            <div className="col-12">
                <fieldset>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputProductName" className="form-control form-control-lg" placeholder="Product Name" required="" />
                                <label htmlFor="inputProductName">Product Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputPrice" className="form-control form-control-lg" placeholder="Price" required="" />
                                <label htmlFor="inputPrice">Price</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputCount" className="form-control form-control-lg" placeholder="Piece Count" required="" />
                                <label htmlFor="inputCount">Piece Count</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputDescription" className="form-control form-control-lg" placeholder="Description" required="" />
                                <label htmlFor="inputDescription">Description</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="col-12 text-center">
                <a href="" className="underline fs-14">Cancel</a>
            </div>
            <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={() => addProduct(product)}>Add Product</button>
            </div>
        </div>
    );
};


export default AddProducts;