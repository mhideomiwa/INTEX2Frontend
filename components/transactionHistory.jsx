import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
`;

function TransactionHistory() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOption, setFilterOption] = useState(null);
    const rowsPerPage = 25;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Function to fetch orders
        const fetchOrders = async () => {
            try {
                // Get the token from localStorage
                const token = sessionStorage.getItem('accessToken');

                // Check if token exists
                if (!token) {
                    // Handle the case where token is not available
                    console.error('Token not found in localStorage');
                    return;
                }

                const response = await fetch('https://intex2-backend.azurewebsites.net/api/Home/GetAllOrders', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });

                if (!response.ok) {
                    // Handle the case where the server returns an error response
                    console.error('Error response:', response.status);
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setOrders(data);
                setTotalPages(Math.ceil(data.length / rowsPerPage));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };


        fetchOrders(); // Call the fetchOrders function when the component mounts
    }, []); // Empty dependency array ensures this effect runs only once

    // Calculate the index range of orders to display based on current page
    const indexOfLastOrder = currentPage * rowsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Filter orders based on the selected filter option
    const filteredOrders = filterOption ? orders.filter(order => order.fraudDetected === filterOption) : orders;

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
                    <button className="page-link" onClick={() => paginate(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <>
            <h1>Transaction History</h1>
            <div className="row">
                <div className="col-sm-8">
                    <span className="label">Filter</span>
                </div>
                <div className="col-sm-4">
                    <span className="label">Fraud Detected</span>
                </div>
            </div>
            <fieldset className="mb-2">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-label-group">
                            <input type="text" id="filter" className="form-control form-control-lg" placeholder="Transaction Id, Date, Address, Subtotal" />
                            <label htmlFor="filter">Search by: Transaction Id, Date, Address, Subtotal</label>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-label-group">
                            <select className="form-control form-control-lg" id="fraud" onChange={(e) => setFilterOption(e.target.value)}>
                                <option value="">All</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div className="table-responsive">
                {loading ? (
                    <div className='justify-content-center text-center align-items-center'>
                        <ClipLoader color="#333" loading={loading} css={override} size={30} />
                    </div>
                ) : (
                    <>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Transaction Id</th>
                                <th scope="col">User ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col">Fraud Detected</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.transactionId} className={order.fraud === 1 ? "text-danger" : ""}>
                                    <td>{order.transactionId}</td>
                                    <td>{order.customerId}</td>
                                    <td>{order.date}</td>
                                    <td>{order.amount}</td>
                                    <td>
                                        {order.fraud === 1 ? "Yes" : "No"}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        <li className="page-item text-right">
                                            <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                                Previous
                                            </button>
                                        </li>
                                        {renderPageNumbers()}
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
                )}
            </div>
        </>
    );
}

export default TransactionHistory;
