import React from 'react';

function PersonalData(props) {
    return (
        <div>
            <div className="row">
                <div className="col">
                    <h2>Personal Data</h2>
                </div>
            </div>

            <fieldset className="mb-2">
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="firstName" className="form-control form-control-lg" placeholder="First Name" required="" value="CONNECT THIS TO THE DATABASE"/>
                                <label htmlFor="firstName">First Name</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="lastName" className="form-control form-control-lg" placeholder="Last Name" required="" value="CONNECT THIS TO THE DATABASE"/>
                                <label htmlFor="lastName">Last Name</label>
                        </div>
                    </div>
                </div>
            </fieldset>

            <span className="label">Address</span>
            <fieldset className="mb-2">
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="address1" className="form-control form-control-lg" placeholder="First Name" required="" value="CONNECT THIS TO THE DATABASE"/>
                            <label htmlFor="address1">Address Line 1</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="address2" className="form-control form-control-lg" placeholder="Last Name" value="CONNECT THIS TO THE DATABASE"/>
                            <label htmlFor="address2">Address Line 2</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="city" className="form-control form-control-lg" placeholder="City" required="" value="CONNECT THIS TO THE DATABASE"/>
                            <label htmlFor="city">City</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="state" className="form-control form-control-lg" placeholder="State" required="" value="CONNECT THIS TO THE DATABASE"/>
                            <label htmlFor="state">State</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="zip" className="form-control form-control-lg" placeholder="Zip" required="" value="CONNECT THIS TO THE DATABASE"/>
                            <label htmlFor="zip">Zip</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="text" id="country" className="form-control form-control-lg" placeholder="Country" required="" value="CONNECT THIS TO THE DATABASE"/>
                            <label htmlFor="country">Country</label>
                        </div>
                    </div>
                </div>
            </fieldset>


            <div className="row">
                <div className="col">
                    <a href="" className="btn btn-primary">Save Changes</a>
                </div>
            </div>
        </div>
    );
}

export default PersonalData;