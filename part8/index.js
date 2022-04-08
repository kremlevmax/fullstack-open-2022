const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");
const PORT = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("data", function (req, res, param) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  Person.find({}).then((persons) =>
    response.send(
      `Phonebook has information of ${persons.length} people. <br> ${date}`
    )
  );
});

app.get("/api/persons/:id", (request, response) => {
  Person.find({}).then((persons) => {
    const person = persons.find((person) => (person.id = request.params.id));
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((result) =>
    response.status(204).end()
  );
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "content missing" });
  }
  const person = new Person({ name: body.name, number: body.number });
  person.save().then((savedPersonEntry) => response.json(savedPersonEntry));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
