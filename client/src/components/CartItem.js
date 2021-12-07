import React from "react";
import crossred from "../assets/crossred.svg";

const CartItem = ({ product, editItem }) => {
	const productCart = (e) => {
		product.count = parseInt(e.target.value);
		product.totalprice = parseInt(product.count * product.price).toFixed(0);
		editItem(product.id, product.count);
	};

	return (
		<>
			<div className="product-block">
				<img
					src={process.env.REACT_APP_API_URL + product.img}
					alt="cartprod"
					className="imgcart"
				/>
				<div>
					<label>{product.name}</label>
					<label>{product.totalprice} руб.</label>
					<label>
						<input
							type="number"
							min="1"
							max="1000"
							value={product.count}
							onChange={(e) => productCart(e)}
						/>
						шт.
					</label>
				</div>
				<img src={crossred} alt="crossred" className="crossred" />
			</div>
			<hr />
		</>
	);
};

export default CartItem;
