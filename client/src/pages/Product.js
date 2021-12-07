import React, { useContext, useEffect } from "react";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProducts } from "../http/productAPI";

const Product = observer(() => {
	const { product } = useContext(Context);

	useEffect(() => {
		fetchProducts().then((data) => {
			product.setProducts(data.rows);
		});
	}, [product]);

	return (
		<>
			<ProductList />
		</>
	);
});

export default Product;
