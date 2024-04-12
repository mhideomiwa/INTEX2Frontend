import React from 'react';
import Link from "next/link";

function Footer(props) {
    return (
        <div>
            <div className="bg-transparent mt-8 py-2">
                <div className="container">
                    <div className="row align-items-center gutter-1">
                        <div className="col-md-8">
                            <p className="small text-muted">&copy; 2024 BYU Information Systems Group 3-8</p>
                        </div>
                        <div className="col-md-4 text-md-right text-muted">
                            <ul className="list list--horizontal list--separated">
                                <li>
                                    <Link className="small underline" href="/privacy">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;