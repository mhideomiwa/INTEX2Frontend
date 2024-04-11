import React, { useEffect, useState } from 'react';
import { PersonalData, ChangePassword } from "../../components";

function Account(props) {
    const [activeTab, setActiveTab] = useState('sidebar-1-1'); // State to track the active tab
    const [lavalampStyle, setLavalampStyle] = useState({}); // State to track lavalamp style

    useEffect(() => {
        // Function to handle tab switching
        const handleTabClick = (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = e.target.getAttribute('href').substring(1); // Get the target tab pane id
            setActiveTab(targetId); // Update the active tab state
            const targetLink = e.target.getBoundingClientRect(); // Get the bounding box of the clicked link
            setLavalampStyle({
                width: `${targetLink.width}px`,
                height: `${targetLink.height}px`,
                transform: `translate(${targetLink.left}px, ${targetLink.bottom}px)`
            }); // Update lavalamp style
        };

        // Attach click event listeners to tab links
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', handleTabClick);
        });

        // Cleanup event listeners when component unmounts
        return () => {
            document.querySelectorAll('.nav-link').forEach((link) => {
                link.removeEventListener('click', handleTabClick);
            });
        };
    }, []); // Run this effect only once on component mount

    return (
        <div>
            <section>
                <div className="container">
                    <div className="row gutter-1 gutter-md-2">
                        <div className="col-lg-4">
                            <aside className="bg-white p-2 p-md-3">
                                <h3 className="fs-20 text-uppercase text-muted mb-2">Welcome, John Doe!</h3>
                                <div className="nav nav-menu flex-column lavalamp" id="sidebar-1" role="tablist">
                                    <a className={`nav-link ${activeTab === 'sidebar-1-1' ? 'active' : ''}`} data-toggle="tab" href="#sidebar-1-1" role="tab" aria-controls="sidebar-1-1" aria-selected={activeTab === 'sidebar-1-1' ? 'true' : 'false'}><i className="fs-24 icon-user"></i> Personal data </a>
                                    <a className={`nav-link ${activeTab === 'sidebar-1-2' ? 'active' : ''}`} data-toggle="tab" href="#sidebar-1-2" role="tab" aria-controls="sidebar-1-2" aria-selected={activeTab === 'sidebar-1-2' ? 'true' : 'false'}><i className="fs-24 icon-lock"></i> Change password</a>
                                    <div className="lavalamp-object ease" style={lavalampStyle}></div> {/* lavalamp effect */}
                                </div>
                            </aside>
                        </div>
                        <div className="col-lg-8">
                            <div className="bg-white p-2 p-md-3">
                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade ${activeTab === 'sidebar-1-1' ? 'show active' : ''}`} id="sidebar-1-1" role="tabpanel" aria-labelledby="sidebar-1-1">
                                        <PersonalData />
                                    </div>

                                    <div className={`tab-pane fade ${activeTab === 'sidebar-1-2' ? 'show active' : ''}`} id="sidebar-1-2" role="tabpanel" aria-labelledby="sidebar-1-2">
                                        <ChangePassword />
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

export default Account;
