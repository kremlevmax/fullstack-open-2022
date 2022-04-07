const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://kremlevmax1989:${password}@cluster0.bsmhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", noteSchema);
console.log(process.argv.length);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({ name, number });
  newPerson.save().then((result) => {
    console.log(`${name} note saved!`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((entries) => {
    entries.forEach((entry) => console.log(entry.name, entry.number));
    mongoose.connection.close().then(console.log("FINISH"));
  });
}

// const maxShapira = new Person({
//   name: "Max Shapira",
//   number: "777888777999",
// });

// const leoDaVinci = new Person({
//   name: "Leo Da Vinci",
//   number: "111222333444",
// });

// const vincentVanGogh = new Person({
//   name: "Vincent Van Gogh",
//   number: "555333111222",
// });

// maxShapira.save().then((result) => {
//   console.log("note saved!");
// });

// leoDaVinci.save().then((result) => {
//   console.log("note saved!");
// });

// vincentVanGogh.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
