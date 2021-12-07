

import {
	ADMIN_ROUTE,
	CATALOG_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	MAIN_ROUTE,
	PRODUCT_ROUTE,
} from "./utils/consts";

import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import Admin from "./pages/Admin";

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
];

export const publicRoutes = [
	{
		path: MAIN_ROUTE,
		Component: Main,
	},
	{
		path: CATALOG_ROUTE + "/:typeId",
		Component: Catalog,
	},
	{
		path: CATALOG_ROUTE,
		Component: Catalog,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: CATALOG_ROUTE + "/:typeId" + PRODUCT_ROUTE + "/:id",
		Component: ProductPage,
	},
];
