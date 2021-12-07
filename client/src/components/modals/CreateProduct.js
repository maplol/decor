import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

import {
	createProduct,
	fetchProducts,
	fetchTypes,
	createType,
} from "../../http/productAPI";
import "../../css/createproduct.css";

const CreateProduct = observer(() => {
	const { product } = useContext(Context);

	const [name, setName] = useState("");
	const [color, setColor] = useState("");
	const [length, setLength] = useState();
	const [width, setWidth] = useState();
	const [height, setHeight] = useState();
	const [price, setPrice] = useState();
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);

	const addInfo = () => {
		setInfo([...info, { title: "", description: "", number: Date.now() }]);
	};
	const changeInfo = (key, value, number) => {
		setInfo(
			info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
		);
	};
	const deleteInfo = (number) => {
		setInfo(info.filter((item) => item.number !== number));
	};

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const addProduct = () => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("color", color);
		formData.append("length", length);
		formData.append("width", width);
		formData.append("height", height);
		formData.append("price", price);
		formData.append("img", file);
		formData.append("typeId", product.selectedType.id);
		formData.append("info", JSON.stringify(info));

		createProduct(formData).then(() => {
			fetchProducts().then((data) => {
				product.setProducts(data);
			});
		});
	};

	const [writetype, setWritetype] = useState("");

	const addType = () => {
		createType({ name: writetype }).then(() => {
			setWritetype("");
		});
	};

	useEffect(() => {
		fetchTypes().then((data) => product.setTypes(data));
	}, []);

	return (
		<>
			<div className="add-file">
				<h3>Создание товара</h3>
				<label>
					Название:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Название"
					/>
				</label>
				<label>
					Цвета:
					<input
						type="text"
						value={color}
						onChange={(e) => setColor(e.target.value)}
						placeholder="Цвета"
					/>
				</label>
				<label>
					Длина:
					<input
						type="text"
						value={length}
						onChange={(e) => setLength(e.target.value)}
						placeholder="Длина"
					/>
				</label>
				<label>
					Ширина:
					<input
						type="text"
						value={width}
						onChange={(e) => setWidth(e.target.value)}
						placeholder="Ширина"
					/>
				</label>
				<label>
					Высота:
					<input
						type="text"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
						placeholder="Высота"
					/>
				</label>
				<label>
					Цена:
					<input
						type="text"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Цена"
					/>
				</label>
				<label>
					Фотография:
					<input type="file" onChange={selectFile} placeholder="Фото" />
				</label>
				<button onClick={() => addInfo()}>Добавить информацию</button>

				{info.map((item) => (
					<div key={item.number} className="infos">
						<input
							type="text"
							placeholder="Заголовок"
							value={item.title}
							onChange={(e) => changeInfo("title", e.target.value, item.number)}
						/>

						<input
							type="text"
							placeholder="Информация"
							value={item.description}
							onChange={(e) =>
								changeInfo("description", e.target.value, item.number)
							}
						/>

						<a onClick={() => deleteInfo(item.number)}>Удалить запись</a>
					</div>
				))}
				<hr />
				<div className="types">
					<p>Тип</p>
					{product.types.map((type) => (
						<label key={type.id}>
							<input
								type="radio"
								name="type"
								onClick={() => {
									product.setSelectedType(type);
								}}
							/>
							{type.name}
						</label>
					))}
				</div>
				<hr />
				<button onClick={addProduct}>Добавить товар</button>
				<hr />
				<div>
					<h3>Создание типа товара</h3>
					<label>
						Название типа:
						<input
							type="text"
							placeholder="Тип"
							onChange={(e) => setWritetype(e.target.value)}
							value={writetype}
						/>
					</label>
					<button onClick={addType}>Добавить тип</button>
				</div>
			</div>
		</>
	);
});

export default CreateProduct;
