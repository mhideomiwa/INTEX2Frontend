import React from 'react';
import Link from 'next/link';
import styles from './carouselItem.module.css';

function CarouselItem({item}) {
    return (

            <div className="card card-product">
                <figure className="card-image">
                    <Link href={`/product/${item.slug}?id=${item.productId}`}>
                        <img src={item.imgLink} alt="Image" className={styles.carouselImage} />
                    </Link>
                </figure>
                <Link href={`/product/${item.slug}?id=${item.productId}`} className="card-body">
                    <h3 className="card-title">{item.name}</h3>
                    <span className="price">${item.price}</span>
                </Link>
            </div>

    );
}



export default CarouselItem;