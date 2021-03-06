const mongoose = require("mongoose");

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
      validator: (value) => /^\d{2,3}-\d{4,}/.test(value),
      message: () => "Wrong phone format",
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
