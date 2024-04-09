import React from 'react';
import Link from 'next/link';

function BlockItem({item}) {
    return (
        <div className="col-6 col-lg-3">
            <Link href={`/product/${item.slug}`}>
                <figure className="category category--alt">
                    <div className="equal">
                        <span className="image" style={{backgroundImage: `url(${item.img_link})`}}></span>
                    </div>
                    <figcaption>{item.name}</figcaption>
                </figure>
            </Link>
        </div>
    );
}

export default BlockItem;
