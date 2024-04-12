import React from 'react';

function Aboutus(props) {
    return (
        <div>
            {/*hero*/}
            <section className="py-0 no-overflow vh-80 scroll-down">
                <div className="image image-scroll" style={{backgroundImage: "url(assets/images/legostormtrooper.jpg)"}}
                     data--100-bottom-top="transform: translateY(0%);"
                     data-top-bottom="transform: translateY(25%);"></div>
                <div className="container">
                    <div className="translate-left-25">
                        <div className=" row justify-content-center vh-100">
                            <div className="col-md-4 align-self-center text-white text-center">
                                <h1 className="text-uppercase fs-60">Our Journey</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*article*/}
            <article>
                <div className="containe">
                    <div>
                        {/*post*/}
                        <div className="col-lg-8">
                            <div className="bg-white p-4">
                                <h2 className="text-uppercase">The History</h2>
                                <p>
                                    Hey there, fellow Lego enthusiasts! I'm Aurora, a passionate Lego master builder and TikTok Lego influencer.
                                    I'm thrilled to welcome you to my new website, where I'll be sharing all things Lego, from tips and tricks to jaw-dropping creations.
                                </p>
                                <p>
                                    Let me take you back to where it all began for me. As a child, I found solace and joy in the colorful world of Lego bricks.
                                    Growing up, I faced my fair share of tough times, but whenever I picked up those bricks,
                                    I felt like I could create anything and escape to a world of endless possibilities.
                                </p>
                                <p>
                                    Lego wasn't just a hobby for me; it was my sanctuary. Building intricate structures and bringing my imagination to life became my therapy.
                                    Through the ups and downs, Lego was always there, teaching me patience, resilience, and the importance of creativity.

                                </p>
                                <p>
                                    Now, as a Lego influencer, I'm on a mission to inspire others to find their own creative outlet and to show that no matter what challenges life throws your way, there's always something beautiful waiting to be built. So join me on this journey, and let's build a world of endless inspiration together, one brick at a time.
                                </p>

                            </div>
                        </div>

                        <div className="col-lg-8">
                            <figure className="equal equal-50">
                                <span className="image" style={{backgroundImage: "url(assets/images/jordant.jpg)"}}></span>
                            </figure>
                        </div>

                        <div className="col-lg-8">
                            <div className="bg-white p-4">
                                <h2 className="text-uppercase">The Design</h2>
                                <p>
                                    As I embark on this exciting journey of sharing my passion for Lego with the world, my ultimate goal goes beyond just building impressive creations. I want to create a thriving community where Lego lovers from all walks of life can come together, share their stories, and inspire one another.
                                    Through my content and interactions, I aim to ignite a spark of creativity in everyone who crosses paths with my website and social platforms.
                                </p>
                                <p>
                                    Lego isn't just about stacking bricks; it's about building connections. I envision a space where builders can
                                    connect not only with the bricks but also with each other. Whether you're a young enthusiast exploring your
                                    imagination or an experienced builder pushing the boundaries of what's possible, there's a place for you in our
                                    community. Together, we can learn from each other, celebrate our successes, and support one another through the
                                    inevitable challenges of building.
                                </p>
                                <p>
                                    So, whether you're here to marvel at jaw-dropping creations, learn new building techniques, or simply connect with
                                    fellow enthusiasts, know that you're part of something bigger—a vibrant community united by our love for Lego.
                                    Together, let's break down barriers, build bridges, and cultivate a community where everyone feels welcomed,
                                    valued, and empowered to unleash their inner master builder.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </article>
        </div>
    );
}

export default Aboutus;