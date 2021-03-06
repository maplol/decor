import React, { useContext, useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

import {
	editProduct,
	fetchOneProduct,
	removeProduct,
	fetchTypes,
	fetchProducts,
} from "../../http/productAPI";

import "../../css/productpage.css";
import "../../css/editproduct.css";

const EditProduct = observer(() => {
	const { product } = useContext(Context);

	const [name, setName] = useState("");
	const [color, setColor] = useState("");
	const [length, setLength] = useState();
	const [width, setWidth] = useState();
	const [height, setHeight] = useState();
	const [price, setPrice] = useState();
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);

	const img = useRef();
	const [productneed, setProductneed] = useState("");

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const getid = (id) => {
		fetchOneProduct(id).then((data) => {
			setProductneed(data);
			setName(data.name);
			setColor(data.color);
			setLength(data.length);
			setWidth(data.width);
			setHeight(data.height);
			setPrice(data.price);
		});
	};

	const removeProductEnd = () => {
		removeProduct(productneed.id).then((data) => {
			setProductneed(data);
			fetchProducts().then((data) => {
				product.setProducts(data);
			});
		});
	};

	const editProductEnd = () => {
		const formData = new FormData();
		formData.append("id", productneed.id);
		formData.append("name", name);
		formData.append("color", color);
		formData.append("length", length);
		formData.append("width", width);
		formData.append("height", height);
		formData.append("price", price);
		formData.append("img", file);
		formData.append("info", JSON.stringify(info));

		editProduct(formData).then((data) => {
			setProductneed(data);
			fetchProducts().then((data) => {
				product.setProducts(data);
			});
		});
	};

	useEffect(() => {
		console.log(product);
		fetchTypes().then((data) => product.setTypes(data));
	}, [product]);

	return (
		<>
			<div className="product-list">
				{product.products.map((product) => (
					<div
						className="product-block"
						onClick={() => {
							getid(product.id);
						}}
						id={"product_" + product.id}
						key={product.id}
						product={product}
					>
						<img
							src={process.env.REACT_APP_API_URL + product.img}
							alt="product"
						/>
						<hr />
						<div className="admin-params">
							<p>????????????????: {product.name}</p>
							<p>??????????: {product.color}</p>
							<p>??????????: {product.length} ????.</p>
							<p>????????????: {product.width} ????.</p>
							<p>????????????: {product.height} ????.</p>
							<p>????????: {product.price} ??????.</p>
						</div>
					</div>
				))}
			</div>

			{productneed.id ? (
				<div className="edit-product">
					<h3>???????????????????????????? ????????????</h3>
					<label>ID: {productneed.id}</label>
					<label>
						????????????????:
						<input
							value={name}
							placeholder="????????????????"
							onChange={(e) => {
								setName(e.target.value);
							}}
							type="text"
							id="name"
							name="name"
						/>
					</label>
					<label>
						????????:
						<input
							value={color}
							placeholder="????????"
							onChange={(e) => {
								setColor(e.target.value);
							}}
							type="text"
							id="color"
							name="color"
						/>
					</label>
					<label>
						??????????:
						<input
							value={length}
							placeholder="??????????"
							onChange={(e) => {
								setLength(e.target.value);
							}}
							type="text"
							id="length"
							name="length"
						/>
					</label>
					<label>
						????????????:
						<input
							value={width}
							placeholder="????????????"
							onChange={(e) => {
								setWidth(e.target.value);
							}}
							type="text"
							id="width"
							name="width"
						/>
					</label>
					<label>
						????????????:
						<input
							value={height}
							placeholder="????????????"
							onChange={(e) => {
								setHeight(e.target.value);
							}}
							type="text"
							id="height"
							name="height"
						/>
					</label>
					<label>
						????????:
						<input
							value={price}
							placeholder="????????"
							onChange={(e) => {
								setPrice(e.target.value);
							}}
							type="text"
							id="price"
							name="price"
						/>
					</label>
					<label>
						????????????????????:
						<input
							type="file"
							onChange={selectFile}
							placeholder="????????"
							ref={img}
						/>
					</label>
					<hr />
					<button onClick={editProductEnd}>????????????????</button>
					<hr />
					<button onClick={removeProductEnd}>??????????????</button>
				</div>
			) : null}
		</>
	);
});

export default EditProduct;
