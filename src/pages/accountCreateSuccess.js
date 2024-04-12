import React from 'react';
import Link from "next/link";

function AccountCreateSuccess() {
    return (
        <div className="container text-center py-6">
            <h1>Account Created</h1>
            <p>Your account has been created successfully. You can now login to your account.</p>
            <Link className="btn btn-success" href="/login">
                Login
            </Link>
        </div>
    );
}

export default AccountCreateSuccess;