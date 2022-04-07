const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const url = `mongodb+srv://kremlevmax1989:IDDQDidkfaidclip123@cluster0.bsmhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

morgan.token("data", function (req, res, param) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

const PORT = process.env.PORT || 3001;

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `Phonebook has information of ${persons.length} people. <br> ${date}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "content missing" });
  }
  if (
    persons.some(
      (person) => person.name === body.name || person.number === body.number
    )
  ) {
    return response.status(400).json({ error: "User data must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
