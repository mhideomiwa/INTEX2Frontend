import React from "react";
import Link from "next/link";

function BlockItem({ item }) {
  return (
    <div className="col-6 col-lg-3">
      <figure className="category category--alt">
        <div className="equal">
          <Link href={`/product/${item.slug}?id=${item.productId}`}>
            <img
              className="image"
              src={item.imgLink}
            ></img>
          </Link>
        </div>
        <figcaption>{item.name}</figcaption>
      </figure>
    </div>
  );
}

export default BlockItem;
