import React from 'react';
import Link from 'next/link';
import styles from './productItem.module.css';

function ProductItem({ product: { name, num_parts, price, imgLink, slug, productId } }) {
    return (
        <div>
            <div className="col-8 col-md-12">
                <div className="card card-product">
                    <figure className="category category-alt">
                        <Link href={`/product/${slug}?id=${productId}`}>
                            <img src={imgLink} alt="Image" className={styles.productItemImage} />
                        </Link>
                    </figure>
                    <div className="card-footer">
                        <h3 className={`${styles.productTitle} card-title`}>
                            <Link href={`/product/${slug}?id=${productId}`}>
                                {name}
                            </Link>
                        </h3>
                        <span className="brand">${price}</span>
                        <span className="brand">{num_parts}Pieces</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
