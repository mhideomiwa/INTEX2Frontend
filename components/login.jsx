import React from 'react';

function Login() {
    return (
        <div className="row gutter-2">
            <div className="col-12">
                <fieldset>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputEmail" className="form-control form-control-lg" placeholder="Email address" required="" />
                                <label htmlFor="inputEmail">Email address</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputPassword" className="form-control form-control-lg" placeholder="Password" required="" />
                                <label htmlFor="inputPassword">Password</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="col-12 text-center">
                <a href="" className="underline fs-14">Forgot Password ?</a>
            </div>
            <div className="col-12">
                <a href="" className="btn btn-primary btn-block">Sign In</a>
            </div>
        </div>

    );
}

export default Login;