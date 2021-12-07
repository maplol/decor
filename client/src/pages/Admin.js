import React, { useContext, useEffect } from "react";
import CreateProduct from "../components/modals/CreateProduct";
import EditProduct from "../components/modals/EditProduct";
import { Context } from "../index";
import { fetchProducts } from "../http/productAPI";

const Admin = () => {
	const { product } = useContext(Context);

	useEffect(() => {
		fetchProducts().then((data) => {
			product.setProducts(data);
		}, []);
	}, [product]);

	return (
		<div className="admin-page">
			<CreateProduct />
			<EditProduct />
		</div>
	);
};

export default Admin;
