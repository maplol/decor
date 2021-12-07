import React, { useContext, useEffect } from "react";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { typeProduct } from "../http/productAPI";

import peremichka from "../assets/3.png";

const Peremichka = observer(() => {
	const { product } = useContext(Context);

	let pricemax = new URLSearchParams(window.location.search).get("pricemax");
	let pricemin = new URLSearchParams(window.location.search).get("pricemin");
	let size = new URLSearchParams(window.location.search).get("size");
	let volume = new URLSearchParams(window.location.search).get("volume");

	useEffect(() => {
		typeProduct("Перемычка", pricemax, pricemin, size, volume).then((data) => {
			product.setProducts(data);
		});
	}, [pricemax, pricemin, size, volume, product]);

	return (
		<>
			<div className="name-page">Перемычки</div>
			<div className="main-width content-type">
				<img src={peremichka} alt="peremichka" />
				<div>
					<p>При перекрытии в проемах окон и дверей используются перемычки.</p>
				</div>
			</div>
			<ProductList />
		</>
	);
});

export default Peremichka;
