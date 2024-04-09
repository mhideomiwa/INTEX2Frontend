import React from 'react';
import Link from 'next/link';
import styles from './carouselItem.module.css';

function CarouselItem({item}) {
    return (
        <div>
            <div className="card card-product">
                <figure className="card-image">
                    <Link href={`/product/${item.slug}`}>
                        <img src={item.img_link} alt="Image" className={styles.carouselImage} />
                    </Link>
                </figure>
                <Link href={`/product/${item.slug}`} className="card-body">
                    <h3 className="card-title">{item.name}</h3>
                    <span className="price">${item.price}</span>
                </Link>
            </div>
        </div>
    );
}



export default CarouselItem;