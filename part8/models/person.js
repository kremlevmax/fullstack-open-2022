require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  phoneNumber: {
    type: String,
    minlength: 9,
    required: true,
    validate: {
      validator: (value) => /\d{2,3}-\d{4,}/.test(value),
      message: (value) => "Wrong phone format",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
