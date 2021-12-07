import React from "react";
import { HashLink } from "react-router-hash-link";
import { MAIN_ROUTE, CATALOG_ROUTE } from "../utils/consts";

const Footer = () => {
	return (
		<footer id="contact">
			<div className="main-width footer-block">
				<div>
					<h3>Контактная информация</h3>
					<p>Горячая линия</p>
					<p>+375(23)122-11-33</p>
					<p>+375(22)123-12-22</p>
					<p>Электронная почта:</p>
					<p>wwelka@mail.ru</p>
				</div>
				<div>
					<h3>ОАО “Декор Бай”</h3>
					<p>230012, г. Витебск. ул. Кирова 16 </p>
					<p>УНП: 12342424</p>
				</div>
				<div>
					<h3>Режим работы</h3>
					<p>Call-центр понедельник-пятница с 10:00 до 19:00</p>
					<p>Доставка заказов ежедневно с 12:00 до 21:00</p>
				</div>
				<div>
					<p>Заказать звонок</p>
					<p>Задать вопрос</p>
					<p>Написать нам</p>
				</div>
				<div>
					<h3>Информация для покупателей</h3>
					<HashLink to={MAIN_ROUTE}>О магазине</HashLink>
					<HashLink to={CATALOG_ROUTE}>Каталог</HashLink>
					<HashLink to={"#contact"}>Контакты</HashLink>
				</div>
				<div>
					<p>Все права защищены законодательством РБ</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
