const { Product, ProductInfo, Type } = require("../models/models");
const apiError = require("../error/ApiError");
const { Op } = require("sequelize");
const uuid = require("uuid");
const path = require("path");

class ProductController {
	async createProduct(req, res) {
		let { name, color, length, width, height, price, typeId, info } = req.body;

		console.log(req.body);

		const { img } = req.files;
		let fileName = uuid.v4() + ".jpg";
		img.mv(path.resolve(__dirname, "..", "static", fileName));

		const product = await Product.create({
			name,
			color,
			length,
			width,
			height,
			price,
			typeId,
			img: fileName,
		});

		if (info) {
			info = JSON.parse(info);
			info.forEach((i) => {
				ProductInfo.create({
					title: i.title,
					description: i.description,
					productId: product.id,
				});
			});
		}

		return res.json(product);
	}

	async getAllProducts(req, res) {
		const { typeId } = req.params;

		const { color } = req.query;
		let pricemax = req.query.pricemax;
		let pricemin = req.query.pricemin;
		let lengthmax = req.query.lengthmax;
		let lengthmin = req.query.lengthmin;
		let widthmax = req.query.widthmax;
		let widthmin = req.query.widthmin;
		let heightmax = req.query.heightmax;
		let heightmin = req.query.heightmin;

		let product = await Product.findAll({
			where: [
				typeId !== "undefined" ? { typeId } : {},
				pricemax ? { price: { [Op.between]: [pricemin, pricemax] } } : {},
				lengthmax ? { length: { [Op.between]: [lengthmin, lengthmax] } } : {},
				widthmax ? { width: { [Op.between]: [widthmin, widthmax] } } : {},
				heightmax ? { height: { [Op.between]: [heightmin, heightmax] } } : {},
				color ? { color: { [Op.in]: color.split(" ") } } : {},
			],
			include: [{ model: Type }],
		});
		return res.json(product);
	}

	async getOneProduct(req, res) {
		const { id } = req.params;
		let product = await Product.findOne({
			where: { id },
			include: [{ model: ProductInfo, as: "info" }, { model: Type }],
		});
		return res.json(product);
	}

	async removeProduct(req, res) {
		const { id } = req.params;
		await Product.findOne({ where: { id } }).then(async (data) => {
			if (data) {
				await Product.destroy({ where: { id } }).then(() => {
					return res.json("Товар удален");
				});
			} else {
				return res.json("Данного товара нет в базе данных");
			}
		});
	}

	async editProduct(req, res) {
		const { id, name, color, length, width, height, price, info } = req.body;

		await Product.findOne({ where: { id } }).then(async (data) => {
			if (data) {
				let newVal = {};
				name ? (newVal.name = name) : false;
				color ? (newVal.color = color) : false;
				length ? (newVal.length = length) : false;
				width ? (newVal.width = width) : false;
				height ? (newVal.height = height) : false;
				price ? (newVal.price = price) : false;

				if (req.files) {
					const { img } = req.files;
					const type = img.mimetype.split("/")[1];
					let fileName = uuid.v4() + `.${type}`;
					img.mv(path.resolve(__dirname, "..", "static", fileName));
					newVal.img = fileName;
				}

				if (info.length != 0) {
					const parseInfo = JSON.parse(info);
					for (const item of parseInfo) {
						await ProductInfo.findOne({ where: { id: item.id } }).then(
							async (data) => {
								if (data) {
									await ProductInfo.update(
										{
											title: item.title,
											description: item.description,
										},
										{ where: { id: item.id } }
									);
								} else {
									await ProductInfo.create({
										title: item.title,
										description: item.description,
										productId: id,
									});
								}
							}
						);
					}
				}

				await Product.update(
					{
						...newVal,
					},
					{ where: { id } }
				).then(() => {
					return res.json("Товар обновлен");
				});
			} else {
				return res.json("Данного товара нет в базе данных");
			}
		});
	}
}

module.exports = new ProductController();
