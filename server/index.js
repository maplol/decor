require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./db");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);


app.use(errorHandler);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
