import { $authHost, $host } from "./index";
// import jwt_decode from "jwt-decode";

export const createType = async (type) => {
	const { data } = await $authHost.post("api/type", type);
	return data;
};
export const fetchTypes = async () => {
	const { data } = await $host.get("api/type");
	return data;
};
export const removeType = async (id) => {
	const { data } = await $authHost.delete("api/type/" + id);
	return data;
};

export const createProduct = async (product) => {
	const { data } = await $authHost.post("api/catalog/product", product);
	return data;
};

export const fetchProducts = async (
	typeId,
	pricemax,
	pricemin,
	lengthmax,
	lengthmin,
	widthmax,
	widthmin,
	heightmax,
	heightmin,
	color
) => {
	const { data } = await $host.get("api/catalog/" + typeId, {
		params: {
			pricemax,
			pricemin,
			lengthmax,
			lengthmin,
			widthmax,
			widthmin,
			heightmax,
			heightmin,
			color: color,
		},
	});
	return data;
};

export const fetchOneProduct = async (id) => {
	const { data } = await $host.get("api/catalog/product/" + id);
	return data;
};

export const editProduct = async (product) => {
	const { data } = await $authHost.put("api/catalog/product", product);
	return data;
};

export const removeProduct = async (id) => {
	const { data } = await $authHost.delete("api/catalog/product/" + id);
	return data;
};
