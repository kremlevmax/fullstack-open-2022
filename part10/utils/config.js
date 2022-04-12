require("dotenv").config();

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;

module.exports = { URL, PORT };
