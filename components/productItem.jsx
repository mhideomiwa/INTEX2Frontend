import React from 'react';
import Link from 'next/link';
import styles from './productItem.module.css';

function ProductItem({product: {name, num_parts, price, img_link, slug}}) {
    return (
        <div>
            <div className="col-8 col-md-12">
                <div className="card card-product">
                    <figure className="card-image">
                        <Link href={`/product/${slug}`}>
                            <img src={img_link} alt="Image" className={styles.productItemImage}/>
                        </Link>
                    </figure>
                    <div className="card-footer">
                        <h3 className={`${styles.productTitle} card-title`}>
                            <Link href={`/product/${slug}`}>{name}</Link>
                        </h3>
                        <span className="brand">${price}</span>
                        <span className="brand">{num_parts} Pieces</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
