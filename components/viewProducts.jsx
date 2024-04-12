import React, { useState, useEffect } from 'react';
import EditProductModal from './editProductModal';


function deleteProduct(product) {
    // Get the token from sessionStorage
    const token = sessionStorage.getItem('accessToken');

    // Check if token exists
    if (!token) {
        // Handle the case where token is not available
        console.error('Token not found in sessionStorage');
        return;
    }

    fetch(`https://intex2-backend.azurewebsites.net/api/Home/DeleteProduct/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(
            product.productId
        ),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



const ViewProducts = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const [showDeleteModa, setshowDeleteModa] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [product, setProduct] = useState({
        productId: '',
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

    function editProduct(product) {
        // Get the token from sessionStorage
        const token = sessionStorage.getItem('accessToken');

        // Check if token exists
        if (!token) {
            // Handle the case where token is not available
            console.error('Token not found in sessionStorage');
            return;
        }

        fetch(`https://intex2-backend.azurewebsites.net/api/Home/EditProduct/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const handleChange = e => {
        console.log('e:', e.target)
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };


    const handleEditClick = () => {
        setShowEditModal(true);
    }

    const handleDeleteClick = () => {
        console.log('showDeleteModal:', showDeleteModa);
        setshowDeleteModa(true);
    };

    const handleCloseDeleteModal = () => {
        setshowDeleteModa(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    }

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
                // Get the token from sessionStorage
                const token = sessionStorage.getItem('accessToken');

                // Check if token exists
                if (!token) {
                    // Handle the case where token is not available
                    console.error('Token not found in sessionStorage');
                    return;
                }

                const response = await fetch("https://intex2-backend.azurewebsites.net/api/Home/GetAllProducts", {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });
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


    const ProductCard = ({ product, index }) => {
        const modalId = `deleteProductModal_${index}`;


        return (
            <div className="col-4" key={product.productId}>
                <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                        <img src={product.imgLink} alt="Image" className="card-img" />
                        <div className="mt-auto">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">${product.price}</p>
                        </div>
                        {/*issues with modal*/}
                        <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                        <button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>

                {showDeleteModa && (
                    <div className="modal fade show" id={modalId} tabIndex="-1" role="dialog" aria-labelledby={`${modalId}_label`} aria-hidden="true" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content border-danger">
                                <div className="modal-header">
                                    <h5 className="modal-title" id={`${modalId}_label`}>Delete Product</h5>
                                    <button type="button" className="close" onClick={handleCloseDeleteModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this product?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal}>Close</button>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showEditModal && (
                    <EditProductModal product={product} handleChange={handleChange} editProduct={editProduct} handleCloseEditModal={handleCloseEditModal} />
                )}

            </div>
        );
    };



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
