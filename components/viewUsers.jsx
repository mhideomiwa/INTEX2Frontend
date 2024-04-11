import React from "react";

function ViewUsers(props) {
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Kendrick</td>
              <td>Davis</td>
              <td>kdavis@gmail.com</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Kendrick</td>
              <td>Davis</td>
              <td>kdavis@gmail.com</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Kendrick</td>
              <td>Davis</td>
              <td>kdavis@gmail.com</td>
              <td>Password!</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewUsers;
