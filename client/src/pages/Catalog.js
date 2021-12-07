import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProducts } from "../http/productAPI";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";

const Catalog = observer(() => {
	const { product } = useContext(Context);
	const { typeId } = useParams();

	let pricemax = new URLSearchParams(window.location.search).get("pricemax");
	let pricemin = new URLSearchParams(window.location.search).get("pricemin");
	let lengthmax = new URLSearchParams(window.location.search).get("lengthmax");
	let lengthmin = new URLSearchParams(window.location.search).get("lengthmin");
	let widthmax = new URLSearchParams(window.location.search).get("widthmax");
	let widthmin = new URLSearchParams(window.location.search).get("widthmin");
	let heightmax = new URLSearchParams(window.location.search).get("heightmax");
	let heightmin = new URLSearchParams(window.location.search).get("heightmin");

	useEffect(() => {
		fetchProducts(
			typeId,
			pricemax,
			pricemin,
			lengthmax,
			lengthmin,
			widthmax,
			widthmin,
			heightmax,
			heightmin
		).then((data) => {
			product.setProducts(data);
		});
	}, [
		product,
		typeId,
		pricemax,
		pricemin,
		lengthmax,
		lengthmin,
		widthmax,
		widthmin,
		heightmax,
		heightmin,
	]);

	return (
		<div className="catalog main-width">
			<ProductList />
		</div>
	);
});

export default Catalog;
