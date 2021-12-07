import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";

import { HashLink } from "react-router-hash-link";

import { fetchTypes } from "../http/productAPI";
import { ADMIN_ROUTE, MAIN_ROUTE, CATALOG_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

import logo from "../assets/logo.svg";
import cartimg from "../assets/cart.svg";
import mark from "../assets/mark.svg";
import phone from "../assets/phone.svg";
import cross from "../assets/cross.svg";

import { Helmet } from "react-helmet";

import { CountContext } from "../App";
import CartItem from "../components/CartItem";

const NavBar = observer(() => {
	const { user, product } = useContext(Context);

	const { getcount } = useContext(CountContext);

	const [nametitle, setNametitle] = useState("Главная");
	const [opentypes, setOpentypes] = useState(false);
	const [opencart, setOpencart] = useState(false);

	let localCart = JSON.parse(localStorage.getItem("cart"));
	const [cartaccept, setCartaccept] = useState(false);
	const { editItem, gettotalprice } = useContext(CountContext);

	const btnaccept = () => {
		setCartaccept(true);
		setTimeout(() => {
			setCartaccept(false);
		}, 3000);
	};

	useEffect(() => {
		fetchTypes().then((data) => product.setTypes(data));
	}, [opentypes, opencart]);
	return (
		<>
			<Helmet>
				<title>{nametitle}</title>
			</Helmet>

			<header>
				<nav className="main-width">
					<HashLink to={MAIN_ROUTE} className="logo">
						<img src={logo} className="logo" alt="logo" />
					</HashLink>

					<HashLink
						to={"#cart"}
						onClick={() => {
							setNametitle("Корзина");
							setOpencart(!opencart);
						}}
						activeclassname="active-link"
						exact
						className="cart-btn"
					>
						<img src={cartimg} alt="cart" />
						<span>{getcount}</span>
					</HashLink>

					<div className="main-puncts">
						<HashLink
							to={opentypes ? CATALOG_ROUTE : "#"}
							onClick={() => {
								setNametitle("Каталог");
								setOpentypes(!opentypes);
							}}
							activeclassname="active-link"
							exact
							className="catalog-btn"
						>
							Каталог
							<img src={mark} alt="mark" />
						</HashLink>
						<HashLink
							to={MAIN_ROUTE}
							onClick={() => setNametitle("Главная")}
							activeclassname="active-link"
							exact
						>
							О магазине
						</HashLink>
						<HashLink
							to={"#contact"}
							onClick={() => setNametitle("Контакты")}
							activeclassname="active-link"
							exact
						>
							Контакты
						</HashLink>
					</div>
					<div className="phones">
						<div>
							<p>+375 (29) 320-23-32</p>
							<p>+375 (25) 325-23-30</p>
						</div>
						<img src={phone} alt="phone" />
					</div>
				</nav>

				{user.isAuth ? (
					<div className="adminpanel">
						<HashLink to={ADMIN_ROUTE}>Редактирование</HashLink>
					</div>
				) : null}
			</header>

			{opentypes ? (
				<div className="types-list-block">
					<div className="types-list">
						<div className="main-width">
							<HashLink
								to={CATALOG_ROUTE}
								onClick={() => {
									setNametitle("Каталог");
									setOpentypes(false);
								}}
								activeclassname="active-link"
								exact
							>
								Все товары
							</HashLink>
							{product.types.map((type) => (
								<HashLink
									to={CATALOG_ROUTE + "/" + type.id}
									onClick={() => {
										setNametitle(type.name);
										setOpentypes(false);
									}}
									activeclassname="active-link"
									exact
									key={type.id}
								>
									{type.name}
								</HashLink>
							))}
						</div>
					</div>
				</div>
			) : (
				""
			)}
			{opencart ? (
				<div className="cart">
					<div className="cart-products">
						<div className="cross-need">
							<h2>Корзина</h2>
							<img
								src={cross}
								alt="cross"
								onClick={() => {
									setOpencart(false);
								}}
							/>
						</div>
						<hr />
						<div className="product-list">
							{localCart
								? localCart.map((product, index) => (
										<CartItem
											key={index}
											product={product}
											editItem={editItem}
										/>
								  ))
								: ""}
						</div>
						<hr />
						<div className="totalprice">
							<p>Итого: {gettotalprice} руб.</p>

							{/* <button onClick={btnaccept}>Оформить заказ</button> */}
						</div>
					</div>
					{cartaccept ? (
						<div className="hoverfullsize">
							<div className="hoverfullsize-in">Ваш заказ обрабатывается</div>
						</div>
					) : (
						""
					)}
				</div>
			) : (
				""
			)}
		</>
	);
});

export default NavBar;
