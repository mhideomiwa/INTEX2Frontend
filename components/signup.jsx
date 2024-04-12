import React, { useState } from 'react';
import Link from "next/link";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        agreeTerms: false,
        gender: '',
        birthDay: '',
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        agreeTerms: '',
        general: '',
        gender: '',
        birthDay: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear errors when user starts typing in a field
        setFormErrors({
            ...formErrors,
            [name]: ''
        });
        // Real-time password validation
        if (name === 'password' || name === 'confirmPassword') {
            const passwordErrors = validatePassword(value); // Change formData.password to value
            setFormErrors(prevErrors => ({
                ...prevErrors,
                ...passwordErrors
            }));
        }
    };



    const validatePassword = (password) => {
        const errors = {};
        if (!password.match(/[^a-zA-Z0-9]/)) {
            errors.PasswordRequiresNonAlphanumeric = "Passwords must have at least one non alphanumeric character.";
        }
        if (!password.match(/[0-9]/)) {
            errors.PasswordRequiresDigit = "Passwords must have at least one digit ('0'-'9').";
        }
        if (!password.match(/[A-Z]/)) {
            errors.PasswordRequiresUpper = "Passwords must have at least one uppercase ('A'-'Z').";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all required fields are filled
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'address1', 'city', 'state', 'zip', 'country', 'agreeTerms'];
        const errors = {};
        let isValid = true;
        requiredFields.forEach(field => {
            if (!formData[field]) {
                errors[field] = 'This field is required';
                isValid = false;
            }
        });
        // Check if password matches confirmPassword
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }
        // Check password requirements
        const passwordErrors = validatePassword(formData.password);
        Object.assign(errors, passwordErrors);
        if (Object.keys(passwordErrors).length > 0) {
            isValid = false;
        }
        // Check if terms are agreed
        if (!formData.agreeTerms) {
            errors.agreeTerms = 'Please agree to the terms and conditions';
            isValid = false;
        }
        setFormErrors(errors);
        if (isValid) {
            // Submit the form
            fetch('https://intex2-backend.azurewebsites.net/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                })
            })
                .then(response => {
                    if (!response.ok) {
                        setFormErrors({
                            ...formErrors,
                            general: 'An error occurred. Please try again later.'
                        });
                        throw new Error(response.status);
                    }
                    const birthDate = formData.birthDay; // No need to parse it again
                    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
                    fetch('https://intex2-backend.azurewebsites.net/api/Home/CreateCustomer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            birthDate: birthDate,
                            countryOfResidence: formData.country,
                            gender: formData.gender,
                            age: age,
                        })
                    })
                        .then(response => {
                            if (!response.ok) {
                                setFormErrors({
                                    ...formErrors,
                                    general: 'An error occurred. Please try again later.'
                                });
                                throw new Error(response.status);
                            }
                            // Redirect to login page
                            window.location.href = '/accountCreateSuccess';
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .then(data => {
                    // Registration successful, proceed to create customer
                    return response.json()
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };





    return (
        <div className="row gutter-2">
            <div className="col-12">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputFirstName" className="form-control form-control-lg" placeholder="First name" name="firstName" value={formData.firstName} onChange={handleChange} required/>
                                <label htmlFor="inputFirstName">First Name</label>
                                {formErrors.firstName && <div className="text-danger">{formErrors.firstName}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputLastName" className="form-control form-control-lg" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                                <label htmlFor="inputLastName">Last Name</label>
                                {formErrors.lastName && <div className="text-danger">{formErrors.lastName}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="email" id="inputEmail" className="form-control form-control-lg" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required/>
                                <label htmlFor="inputEmail">Email</label>
                                {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="password" id="inputPassword" className="form-control form-control-lg" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required/>
                                <label htmlFor="inputPassword">Password</label>
                                {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="password" id="inputConfirmPassword" className="form-control form-control-lg" placeholder="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
                                <label htmlFor="inputConfirmPassword">Confirm Password</label>
                                {formErrors.confirmPassword && <div className="text-danger">{formErrors.confirmPassword}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputAddress1" className="form-control form-control-lg" placeholder="Address 1" name="address1" value={formData.address1} onChange={handleChange} required/>
                                <label htmlFor="inputAddress1">Address 1</label>
                                {formErrors.address1 && <div className="text-danger">{formErrors.address1}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputAddress2" className="form-control form-control-lg" placeholder="Address 2" name="address2" value={formData.address2} onChange={handleChange}/>
                                <label htmlFor="inputAddress2">Address 2</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputCity" className="form-control form-control-lg" placeholder="City" name="city" value={formData.city} onChange={handleChange} required/>
                                <label htmlFor="inputCity">City</label>
                                {formErrors.city && <div className="text-danger">{formErrors.city}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputState" className="form-control form-control-lg" placeholder="State" name="state" value={formData.state} onChange={handleChange} required/>
                                <label htmlFor="inputState">State</label>
                                {formErrors.state && <div className="text-danger">{formErrors.state}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputZip" className="form-control form-control-lg" placeholder="Zip" name="zip" value={formData.zip} onChange={handleChange} required/>
                                <label htmlFor="inputZip">Zip</label>
                                {formErrors.zip && <div className="text-danger">{formErrors.zip}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="text" id="inputCountry" className="form-control form-control-lg" placeholder="Country" name="country" value={formData.country} onChange={handleChange} required/>
                                <label htmlFor="inputCountry">Country</label>
                                {formErrors.country && <div className="text-danger">{formErrors.country}</div>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-label-group">
                                <select id="inputGender" className="form-control form-control-lg" name="gender" value={formData.gender} onChange={handleChange} required>
                                    <option className="select" value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                                {formErrors.gender && <div className="text-danger">{formErrors.gender}</div>}
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-label-group">
                                <input type="date" id="inputBirthDay" className="form-control form-control-lg" name="birthDay" value={formData.birthDay} onChange={handleChange} required/>
                                <label htmlFor="inputBirthDay">Birth Day</label>
                                {formErrors.birthDay && <div className="text-danger">{formErrors.birthDay}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox mt-1">
                        <input type="checkbox" id="customCheckbox1" name="agreeTerms" className="custom-control-input" checked={formData.agreeTerms} onChange={handleChange}/>
                        <label className="custom-control-label text-muted" htmlFor="customCheckbox1">Yes, I agree to the <Link href="" className="underline">Terms and Conditions</Link></label>
                        {formErrors.agreeTerms && <div className="text-danger">{formErrors.agreeTerms}</div>}
                    </div>
                    <div>
                        {formErrors.general && <div className="text-danger">{formErrors.general}</div>}
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-block">Create an account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
