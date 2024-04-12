import React, { useEffect, useState } from 'react';
import { TransactionHistory, ViewProducts, AddProducts, FileUpload, ViewUsers } from "../../components";

function Admin({products, orders, users}) {
    const [activeTab, setActiveTab] = useState('sidebar-1-1'); // State to track the active tab

    useEffect(() => {
        // Function to handle tab switching
        const handleTabClick = (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = e.target.getAttribute('href').substring(1); // Get the target tab pane id
            setActiveTab(targetId); // Update the active tab state
            // Update lavalamp style
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
            <section>
                <div className="container">
                    <div className="row gutter-1 gutter-md-2">
                        <div className="col-lg-4">
                            <aside className="bg-white p-2 p-md-3">
                                <h3 className="fs-20 text-uppercase text-muted mb-2">Welcome, John Doe!</h3>
                                <div className="nav nav-menu flex-column lavalamp" id="sidebar-1" role="tablist">
                                    <a className={`sub-nav-link ${activeTab === 'sidebar-1-1' ? 'active' : ''}`} data-toggle="tab"
                                       href="#sidebar-1-1" role="tab" aria-controls="sidebar-1-1"
                                       aria-selected={activeTab === 'sidebar-1-1' ? 'true' : 'false'}>
                                        <i className="fs-24 icon-sidebar"></i> Transaction History </a>

                                    <a className={`sub-nav-link ${activeTab === 'sidebar-1-2' ? 'active' : ''}`} data-toggle="tab"
                                       href="#sidebar-1-2" role="tab" aria-controls="sidebar-1-2"
                                       aria-selected={activeTab === 'sidebar-1-2' ? 'true' : 'false'}>
                                        <i className="fs-24 icon-box"></i> View/Edit Products
                                    </a>

                                    <a className={`sub-nav-link ${activeTab === 'sidebar-1-2' ? 'active' : ''}`} data-toggle="tab"
                                       href="#sidebar-1-3" role="tab" aria-controls="sidebar-1-3"
                                       aria-selected={activeTab === 'sidebar-1-2' ? 'true' : 'false'}>
                                        <i className="fs-24 icon-box"></i> Add Products Products
                                    </a>

                                    <a className={`sub-nav-link ${activeTab === 'sidebar-1-2' ? 'active' : ''}`} data-toggle="tab"
                                       href="#sidebar-1-4" role="tab" aria-controls="sidebar-1-4"
                                       aria-selected={activeTab === 'sidebar-1-2' ? 'true' : 'false'}>
                                        <i className="fs-24 icon-users"></i> View Users
                                    </a>
                                </div>
                            </aside>
                        </div>
                        <div className="col-lg-8">
                            <div className="bg-white p-2 p-md-3">
                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade ${activeTab === 'sidebar-1-1' ? 'show active' : ''}`} id="sidebar-1-1" role="tabpanel" aria-labelledby="sidebar-1-1">
                                        <TransactionHistory />
                                    </div>

                                    <div className={`tab-pane fade ${activeTab === 'sidebar-1-2' ? 'show active' : ''}`} id="sidebar-1-2" role="tabpanel" aria-labelledby="sidebar-1-2">
                                        <ViewProducts products={products} />
                                    </div>

                                    <div className={`tab-pane fade ${activeTab === 'sidebar-1-3' ? 'show active' : ''}`} id="sidebar-1-3" role="tabpanel" aria-labelledby="sidebar-1-3">
                                        <FileUpload />
                                        <AddProducts/>
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'sidebar-1-4' ? 'show active' : ''}`} id="sidebar-1-4" role="tabpanel" aria-labelledby="sidebar-1-4">
                                        <ViewUsers users={users} />
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


// export async function getServerSideProps() {
//     // console.log('API_URI:', process.env.API_URI)
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//     const productRes = await fetch(process.env.API_URI + "/api/Home/GetAllProducts");
//     const orderRes = await fetch(process.env.API_URI + "/api/Home/GetAllOrders");
//     const userRes = await fetch(process.env.API_URI + "/api/Home/GetAllCustomers");
//
//
//     const allProducts = await productRes.json();
//     const allOrders = await orderRes.json();
//     const allUsers = await userRes.json();
//
//     console.log('All Users:', allUsers.slice(0,25))
//
//     // console.log('All Products:', allProducts)
//     return {
//         props: {
//             products: allProducts,
//             orders: allOrders,
//             users: allUsers,
//
//         },
//     }
// }


export default Admin;