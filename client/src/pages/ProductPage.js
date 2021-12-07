import React, { useState, useEffect, useContext } from "react";
import { fetchOneProduct, fetchProducts } from "../http/productAPI";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { CountContext } from "../App";
import { Context } from "../index";

import { useHistory } from "react-router-dom";
import { PRODUCT_ROUTE, CATALOG_ROUTE } from "../utils/consts";

import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "swiper/swiper.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const ProductPage = observer(() => {
	const history = useHistory();
	const { product } = useContext(Context);
	const { addItem } = useContext(CountContext);

	const [productpage, setProduct] = useState({ info: [] });
	const { id } = useParams();

	const Productscart = () => {
		productpage.count = 1;
		productpage.totalprice = parseInt(productpage.price);
		addItem(productpage);
	};

	useEffect(() => {
		fetchOneProduct(id).then((data) => {
			setProduct(data);
		});
		fetchProducts(productpage.typeId).then((data) => {
			product.setProducts(data);
		});
	}, [id, product, productpage.typeId]);

	return (
		<div className="main-width product-content">
			<div className="product-info">
				<img
					src={process.env.REACT_APP_API_URL + productpage.img}
					alt="productpage"
				/>
				<div>
					<h3>{productpage.name}</h3>
					<p>
						<span> Размер:</span> {productpage.length} x {productpage.width} x{" "}
						{productpage.height}
					</p>

					{productpage.info.map((info, index) => (
						<p key={index}>
							<span> {info.title}:</span> {info.description}
						</p>
					))}
					<p>
						<span>Цена:</span> {productpage.price} руб.
					</p>
				</div>
				<div onClick={Productscart} className="btn-in">
					<svg
						width="110"
						height="110"
						viewBox="0 0 110 110"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M57.5 5C67.8835 5 78.0338 8.07907 86.6674 13.8478C95.301 19.6166 102.03 27.816 106.004 37.4091C109.977 47.0022 111.017 57.5582 108.991 67.7422C106.966 77.9262 101.965 87.2808 94.6232 94.623C87.2809 101.965 77.9264 106.965 67.7424 108.991C57.5584 111.017 47.0024 109.977 37.4093 106.004C27.8161 102.03 19.6167 95.3011 13.8479 86.6676C8.07914 78.034 5.00004 67.8837 5 57.5002L57.5 57.5V5Z"
							fill="#6E4E6F"
							className="btn"
						/>
						<path
							d="M1.52101 53.5C1.90334 39.8549 7.49069 26.8489 17.1698 17.1698C26.8489 7.49069 39.8549 1.90333 53.5 1.52101V53.5L1.52101 53.5Z"
							stroke="#AE0C0C"
							strokeWidth="3"
						/>
						<line x1="43" y1="76.5" x2="103" y2="76.5" stroke="#AE0C0C" />
					</svg>

					<span>Заказать</span>
				</div>
			</div>

			<hr />

			<div>
				<p>Похожие товары</p>
				<Swiper
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					navigation={true}
					loop={true}
					speed={1000}
					slidesPerView={4}
					spaceBetween={20}
					loopAdditionalSlides={1}
				>
					{product.products.map((product, index) => (
						<SwiperSlide
							key={index}
							onClick={() =>
								history.push(
									CATALOG_ROUTE +
										"/" +
										product.typeId +
										PRODUCT_ROUTE +
										"/" +
										product.id
								)
							}
						>
							<img
								src={process.env.REACT_APP_API_URL + product.img}
								alt="productpage"
							/>
							<hr />
							<p>{product.name}</p>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
});

export default ProductPage;
