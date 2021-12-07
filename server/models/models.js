const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Product = sequelize.define("product", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	color: { type: DataTypes.STRING, allowNull: false },
	length: { type: DataTypes.INTEGER, defaultValue: 0 },
	width: { type: DataTypes.INTEGER, defaultValue: 0 },
	height: { type: DataTypes.INTEGER, defaultValue: 0 },
	price: { type: DataTypes.INTEGER, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const ProductInfo = sequelize.define("product_info", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
});

Type.hasMany(Product);
Product.belongsTo(Type);

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

module.exports = { User, Product, Type, ProductInfo };
