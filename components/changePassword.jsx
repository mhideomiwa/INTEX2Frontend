import React, { useState } from 'react';

function ChangePassword(props) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSavePassword = () => {
        if (newPassword === confirmPassword) {
            // Passwords match, proceed with saving
            setPasswordsMatch(true);
            // Your logic to save the password goes here
        } else {
            // Passwords don't match, show error
            setPasswordsMatch(false);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h2>Change Password</h2>
                </div>
            </div>

            <fieldset className="mb-2">
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="password" id="currentPassword" className="form-control form-control-lg" placeholder="Current Password" required=""/>
                            <label htmlFor="currentPassword">Current Password</label>
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset className="mb-2">
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="password" id="newPassword" className="form-control form-control-lg" placeholder="New Password" required="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            <label htmlFor="newPassword">New Password</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-label-group">
                            <input type="password" id="confirmPassword" className={`form-control form-control-lg ${!passwordsMatch ? 'is-invalid' : ''}`} placeholder="Confirm Password" required="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            {!passwordsMatch && <div className="invalid-feedback">Passwords do not match.</div>}
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={handleSavePassword}>Save Password</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
