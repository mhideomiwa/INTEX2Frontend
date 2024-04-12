import React, { useEffect, useState } from 'react';
import { LoginForm, SignUp} from '../../components'
import Script from "next/script";
import Head from "next/head";


function Login(props) {
    const [activeTab, setActiveTab] = useState('component-1-1'); // State to track the active tab

    useEffect(() => {
        // Function to handle tab switching
        const handleTabClick = (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = e.target.getAttribute('href').substring(1); // Get the target tab pane id
            setActiveTab(targetId); // Update the active tab state
            const targetPane = document.getElementById(targetId); // Get the target tab pane
            if (targetPane) {
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach((pane) => {
                    pane.classList.remove('show', 'active');
                });
                // Show the target tab pane
                targetPane.classList.add('show', 'active');
            }
        };

        // Attach click event listeners to tab links
        document.querySelectorAll('.sub-nav-link').forEach((link) => {
            link.addEventListener('click', handleTabClick);
        });

        // Cleanup event listeners when component unmounts
        return () => {
            document.querySelectorAll('.sub-nav-link').forEach((link) => {
                link.removeEventListener('click', handleTabClick);
            });
        };
    }, []); // Run this effect only once on component mount

    return (
        <div>
            <Head>
                <Script src="/assets/js/vendor.min.js"></Script>
                <Script src="/assets/js/app.js"></Script>
            </Head>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4">
                            <div className="card boxed">
                                <div className="card-header">
                                    <ul className="nav nav-tabs nav-fill card-header-tabs lavalamp" id="component-1" role="tablist">
                                        <li className="nav-item">
                                            <a className={`nav-link sub-nav-link ${activeTab === 'component-1-1' ? 'active' : ''}`} href="#component-1-1" role="tab" aria-controls="component-1-1" aria-selected={activeTab === 'component-1-1' ? 'true' : 'false'}>Log In</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link sub-nav-link${activeTab === 'component-1-2' ? 'active' : ''}`} href="#component-1-2" role="tab" aria-controls="component-1-2" aria-selected={activeTab === 'component-1-2' ? 'true' : 'false'}>Sign Up</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content" id="component-1-content">
                                        <div className="tab-pane fade show active" id="component-1-1" role="tabpanel" aria-labelledby="component-1-1">
                                            <LoginForm/>
                                        </div>
                                        <div className="tab-pane fade" id="component-1-2" role="tabpanel" aria-labelledby="component-1-2">
                                            <SignUp/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
