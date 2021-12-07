import React, { useState, useEffect, useReducer } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../http/productAPI";
import mark from "../assets/mark.svg";

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import { useParams } from "react-router-dom";

let productParams = {
	pricemin: "",
	pricemax: "",
	lengthmin: "",
	lengthmax: "",
	widthmin: "",
	widthmax: "",
	heightmin: "",
	heightmax: "",
	color: "",
};

const Filter = observer(() => {
	const history = useHistory();
	const [checkedcolor, setCheckedcolor] = useState([]);

	const reducer = (stateValues, action) => {
		switch (action.type) {
			case "update":
				return {
					pricedvalue: action.pricedvalue,
					lengthdvalue: action.lengthdvalue,
					widthdvalue: action.widthdvalue,
					heightdvalue: action.heightdvalue,

					price: action.price,
					length: action.length,
					width: action.width,
					height: action.height,
				};
			case "price":
				return {
					...stateValues,
					price: action.price,
				};
			case "length":
				return { ...stateValues, length: action.length };
			case "width":
				return { ...stateValues, width: action.width };
			case "height":
				return { ...stateValues, height: action.height };
			default:
				return stateValues;
		}
	};

	const [stateValues, dispatchValues] = useReducer(reducer, {
		price: {
			max: 1000,
			min: 0,
		},
		length: {
			max: 1000,
			min: 0,
		},
		width: {
			max: 1000,
			min: 0,
		},
		height: {
			max: 1000,
			min: 0,
		},
		pricedvalue: { max: 1000, min: 0 },
		lengthdvalue: { max: 1000, min: 0 },
		widthdvalue: { max: 1000, min: 0 },
		heightdvalue: { max: 1000, min: 0 },
	});

	const { typeId } = useParams();

	// ПОФИКСИТЬ ЦВЕТ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	let colors = [
		"Белый",
		"Черный",
		"Красный",
		"Синий",
		"Голубой",
		"Желтый",
	];

	const serialize = (obj) => {
		for (let propName in obj) {
			if (
				obj[propName] === "" ||
				obj[propName] === null ||
				obj[propName] === undefined
			) {
				delete obj[propName];
			}
		}
		obj = Object.keys(obj)
			.map((key) => (obj[key] != "" ? `${key}=${obj[key]}` : ""))
			.join("&");

		return obj;
	};
	const removeNumber = (arr, num) => {
		return arr.filter((el) => el !== num);
	};

	const changeradio = (e, min1, max1) => {
		Object.keys(productParams).forEach(() => {
			productParams[min1] = parseInt(e[0]);
			productParams[max1] = parseInt(e[1]);
			history.push({
				search: serialize(productParams),
			});
		});
	};

	const changeColor = (position) => {
		const updatedChecked = checkedcolor.map((item, index) =>
			index === position ? !item : item
		);
		setCheckedcolor(updatedChecked);

		if (!checkedcolor[position]) {
			productParams.color += colors[position] + ",";
			history.push({
				search: serialize(productParams),
			});
		} else {
			productParams.color.replace(colors[position] + ",", "");
			//	productParams.color = removeNumber(productParams.color, colors[position]);
			history.push({
				search: serialize(productParams),
			});
		}
	};

	useEffect(() => {
		fetchProducts(typeId).then((data) => {
			setCheckedcolor(Array(data.length).fill(false));

			dispatchValues({
				type: "update",

				pricedvalue: {
					min: data.reduce((a, b) => (a.price < b.price ? a : b)).price,
					max: data.reduce((a, b) => (a.price > b.price ? a : b)).price + 1,
				},
				lengthdvalue: {
					min: data.reduce((a, b) => (a.length < b.length ? a : b)).length,

					max: data.reduce((a, b) => (a.length > b.length ? a : b)).length + 1,
				},
				widthdvalue: {
					min: data.reduce((a, b) => (a.width < b.width ? a : b)).width,

					max: data.reduce((a, b) => (a.width > b.width ? a : b)).width + 1,
				},
				heightdvalue: {
					min: data.reduce((a, b) => (a.height < b.height ? a : b)).height,
					max: data.reduce((a, b) => (a.height > b.height ? a : b)).height + 1,
				},

				price: {
					min: data.reduce((a, b) => (a.price < b.price ? a : b)).price,
					max: data.reduce((a, b) => (a.price > b.price ? a : b)).price + 1,
				},
				length: {
					min: data.reduce((a, b) => (a.length < b.length ? a : b)).length,
					max: data.reduce((a, b) => (a.length > b.length ? a : b)).length + 1,
				},
				width: {
					min: data.reduce((a, b) => (a.width < b.width ? a : b)).width,
					max: data.reduce((a, b) => (a.width > b.width ? a : b)).width + 1,
				},
				height: {
					min: data.reduce((a, b) => (a.height < b.height ? a : b)).height,
					max: data.reduce((a, b) => (a.height > b.height ? a : b)).height + 1,
				},
			});
		});
	}, [typeId]);

	return (
		<div className="filter">
			<h3>Параметры</h3>
			<hr />
			<div className="type-of-filter">
				{/* PRICE */}
				<p className="param-of-filter">Цена</p>
				<div className="minmax">
					<span>от {stateValues.price.min}</span>
					<span>до {stateValues.price.max}</span>
				</div>

				<Nouislider
					start={[stateValues.pricedvalue.min, stateValues.pricedvalue.max]}
					range={stateValues.pricedvalue}
					connect
					onSlide={(e) =>
						dispatchValues({
							type: "price",
							price: {
								min: Math.round(parseInt(e[0])),
								max: Math.round(parseInt(e[1])),
							},
						})
					}
					onChange={(e) => changeradio(e, "pricemin", "pricemax")}
					step={1}
				/>
			</div>
			<hr />
			<h3>Размеры</h3>
			<hr />
			{/* LENGTH */}
			<div className="type-of-filter">
				<p className="param-of-filter">Длина</p>
				<div className="minmax">
					<span>от {stateValues.length.min}</span>
					<span>до {stateValues.length.max}</span>
				</div>

				<Nouislider
					start={[stateValues.lengthdvalue.min, stateValues.lengthdvalue.max]}
					range={stateValues.lengthdvalue}
					connect
					onSlide={(e) =>
						dispatchValues({
							type: "length",
							length: {
								min: Math.round(parseInt(e[0])),
								max: Math.round(parseInt(e[1])),
							},
						})
					}
					onChange={(e) => changeradio(e, "lengthmin", "lengthmax")}
					step={1}
				/>
			</div>

			{/* WIDTH */}
			<div className="type-of-filter">
				<p className="param-of-filter">Ширина</p>
				<div className="minmax">
					<span>от {stateValues.width.min}</span>
					<span>до {stateValues.width.max}</span>
				</div>

				<Nouislider
					start={[stateValues.widthdvalue.min, stateValues.widthdvalue.max]}
					range={stateValues.widthdvalue}
					connect
					onSlide={(e) =>
						dispatchValues({
							type: "width",
							width: {
								min: Math.round(parseInt(e[0])),
								max: Math.round(parseInt(e[1])),
							},
						})
					}
					onChange={(e) => changeradio(e, "widthmin", "widthmax")}
					step={1}
				/>
			</div>

			{/* HEIGHT */}
			<div className="type-of-filter">
				<p className="param-of-filter">Высота</p>
				<div className="minmax">
					<span>от {stateValues.height.min}</span>
					<span>до {stateValues.height.max}</span>
				</div>

				<Nouislider
					start={[stateValues.heightdvalue.min, stateValues.heightdvalue.max]}
					range={stateValues.heightdvalue}
					connect
					onSlide={(e) =>
						dispatchValues({
							type: "height",
							height: {
								min: Math.round(parseInt(e[0])),
								max: Math.round(parseInt(e[1])),
							},
						})
					}
					onChange={(e) => changeradio(e, "heigthmin", "heigthmax")}
					step={1}
				/>
			</div>
			<hr />
			<h3>Цвет</h3>
			<hr />
			<div className="type-of-filter">
				{colors.map((color, k) => (
					<div key={k} className="product-filter">
						<input
							type="checkbox"
							id={"color" + k}
							defaultChecked={checkedcolor[k]}
							onClick={() => changeColor(k)}
						/>
						<label htmlFor={"color" + k}>{color}</label>
					</div>
				))}
			</div>
		</div>
	);
});

export default Filter;
