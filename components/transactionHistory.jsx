import React from 'react';

function TransactionHistory(props) {
    return (
        <div>
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
                            <input type="text" id="filter" className="form-control form-control-lg" placeholder="Transaction Id, Date, Address, Subtotal"/>
                            <label htmlFor="filter">Search by: Transaction Id, Date, Address, Subtotal</label>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-label-group">
                            <select className="form-control form-control-lg" id="fraud">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Transaction Id</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Address</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Fraud Detected</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>email@email.com</td>
                            <td>2021-09-01</td>
                            <td>123 Main St</td>
                            <td>$100</td>
                            <td>No</td>
                            <td><i className="icon-chevron-right"></i> </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>email@email.com</td>
                            <td>2021-09-02</td>
                            <td>456 Elm St</td>
                            <td>$200</td>
                            <td>Yes</td>
                            <td><i className="icon-chevron-right"></i> </td>

                        </tr>
                        <tr>
                            <td>3</td>
                            <td>email@email.com</td>
                            <td>2021-09-03</td>
                            <td>789 Oak St</td>
                            <td>$300</td>
                            <td>No</td>
                            <td><i className="icon-chevron-right"></i> </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionHistory;