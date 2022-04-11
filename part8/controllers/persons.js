const personRouter = require("express").Router();
const Person = require("../models/person");

personRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

personRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

personRouter.post("/", (request, response, next) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "content missing" });
  } else {
    const person = new Person({
      name: body.name,
      phoneNumber: body.phoneNumber,
    });
    person
      .save()
      .then((savedPersonEntry) => response.json(savedPersonEntry))
      .catch((error) => next(error));
  }
});

personRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

personRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  Person.findByIdAndUpdate(
    request.params.id,
    {
      phoneNumber: body.phoneNumber,
    },
    { new: true, runValidators: true, context: "query" }
  )
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = personRouter;
