import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ProductItem from "./ProductItem";

import Filter from "./Filter";

const ProductList = observer(() => {
	const { product } = useContext(Context);

	return (
		<>
			<Filter />
			<div className="product-list">
				{product.products.length != 0 ? (
					product.products.map((product) => (
						<ProductItem key={product.id} product={product} />
					))
				) : (
					<p>Нет товаров по фильтрам</p>
				)}
			</div>
		</>
	);
});

export default ProductList;
