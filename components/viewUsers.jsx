import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

function ViewUsers() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOption, setFilterOption] = useState(null);
    const rowsPerPage = 25;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Get the token from localStorage
                const token = sessionStorage.getItem('accessToken');

                // Check if token exists
                if (!token) {
                    // Handle the case where token is not available
                    console.error('Token not found in localStorage');
                    return;
                }

                const response = await fetch("https://intex2-backend.azurewebsites.net/api/Home/GetAllCustomers", {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });
                const data = await response.json();
                setUsers(data);
                setTotalPages(Math.ceil(data.length / rowsPerPage));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    // Calculate the index range of users to display based on current page
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div>
            <h1>View Users</h1>
            <div className="row">
                <div className="col-sm-8">
                    <span className="label">Filter</span>
                </div>
            </div>
            <fieldset className="smb-2">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-label-group">
                            <input
                                type="text"
                                id="filter"
                                className="form-control form-control-lg"
                                placeholder="Transaction Id, Date, Address, Subtotal"
                            />
                            <label htmlFor="filter">
                                Search by: Transaction Id, Date, Address, Subtotal
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <br></br>
            <div className="table-responsive">
                {loading ? (
                    <div className='justify-content-center text-center align-items-center'>
                        <ClipLoader color="#333" loading={loading} css={override} size={30} />
                    </div>
                ) : (
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.customerId}>
                                <td>{user.customerId}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn btn-primary">Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ViewUsers;
