import React from 'react';
import Link from 'next/link';
import styles from './carouselItem.module.css';

function CarouselItem({item}) {
    return (
        <div className="card card-product">
            <figure className="category category--alt">
                <div>                
                    <Link href={`/product/${item.slug}?id=${item.productId}`}>
                        <img src={item.imgLink} alt="Image" className={styles.carouselImage} />
                    </Link>
                </div>
                <figcaption>{item.name}</figcaption>
            </figure>
        </div>
    );
}



export default CarouselItem;