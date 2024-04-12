import React, { useState } from 'react';
import slugify from 'slugify'; // Import slugify library

function AddProducts() {
    const [product, setProduct] = useState({
        name: '',
        year: '',
        numParts: '',
        price: '',
        imgLink: '',
        primaryColor: '',
        secondaryColor: '',
        description: '',
        category: '',
        slug: '' // auto-generated
    });

    const [successMessage, setSuccessMessage] = useState('');

    const addProduct = () => {
        // Auto-generate slug based on the name
        const slug = slugify(product.name, { lower: true });
        setProduct(prevProduct => ({
            ...prevProduct,
            slug: slug
        }));

        // Make the API call
        fetch('https://intex2-backend.azurewebsites.net/api/Home/CreateProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage('Product added successfully!');
                // Reset form fields
                setProduct({
                    name: '',
                    year: '',
                    numParts: '',
                    price: '',
                    imgLink: '',
                    primaryColor: '',
                    secondaryColor: '',
                    description: '',
                    category: '',
                    slug: ''
                });
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error
            });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    return (
        <div className="row gutter-2">
            <div className="col-12">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
                                    value={product.name}
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
                                    value={product.year}
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
                                    value={product.price}
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
                                    value={product.numParts}
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
                                    value={product.description}
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
                                    value={product.imgLink}
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
                                    value={product.primaryColor}
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
                                    value={product.secondaryColor}
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
                                    value={product.category}
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
                <a href="" className="underline fs-14">Cancel</a>
            </div>
            <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={addProduct}>Add Product</button>
            </div>
        </div>
    );
};

export default AddProducts;