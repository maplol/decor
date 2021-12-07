import React from "react";
import { useHistory } from "react-router-dom";
import { PRODUCT_ROUTE, CATALOG_ROUTE } from "../utils/consts";

const ProductItem = ({ product }) => {
	const history = useHistory();

	return (
		<div
			className="product-block"
			onClick={() =>
				history.push(
					CATALOG_ROUTE +
						"/" +
						product.typeId +
						PRODUCT_ROUTE +
						"/" +
						product.id
				)
			}
		>
			<img src={process.env.REACT_APP_API_URL + product.img} alt="product" />
			<h3>{product.name}</h3>
			<hr />
			<div className="product-add">
				<p>{product.price} руб.</p>
				<button>Подробнее</button>
			</div>
		</div>
	);
};

export default ProductItem;
