import React, { useState } from "react";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = () => {
        fetch("https://intex2-backend.azurewebsites.net/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                sessionStorage.setItem("email", user.email);
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                if (data.accessToken && data.refreshToken && data.expiresIn) {
                    const { accessToken, refreshToken, expiresIn } = data;

                    // Store the tokens and expiration time in localStorage
                    sessionStorage.setItem("accessToken", accessToken);
                    sessionStorage.setItem("refreshToken", refreshToken);
                    sessionStorage.setItem("expiresAt", Date.now() + expiresIn * 1000);

                    // Redirect to the desired page after successful login
                      window.location.href = "/";
                } else {
                    console.log("Invalid response data format");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                if (error.message === "401") {
                    setErrorMessage("Invalid email or password");
                }
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="row gutter-2">
            <div className="col-12">
                <fieldset>
                    <div className="row">
                        <div className="col-12">
                            <fieldset>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-label-group">
                                            <input
                                                type="email"
                                                id="loginEmail"
                                                className="form-control form-control-lg"
                                                placeholder="Email address"
                                                required=""
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="loginEmail">Email address</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-label-group">
                                            <input
                                                type="password"
                                                id="loginPassword"
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                                required=""
                                                name="password"
                                                value={user.password}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="loginPassword">Password</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </fieldset>
                <div className="row">
                    <div className="col-12">
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    </div>
                </div>
            </div>
            <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={handleLogin}>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Login;
