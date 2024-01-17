require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
const Agenda = require("./models/agenda");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("build"));

app.use(express.json());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :body",
  ),
);

app.get("/api/persons", (request, response, next) => {
  Agenda.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Agenda.find({})
    .then((persons) => {
      const numpersons = persons.length;
      const date = new Date().toString();
      response.end(`Phonebook has info for ${numpersons} people\n${date}`);
    })
    .catch((error) => next(error));
});

const NotFound = () => {
  const notFoundError = new Error("Person not found");
  notFoundError.name = "NotFoundError";
  return notFoundError;
};

app.get("/api/persons/:id", (request, response, next) => {
  Agenda.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        next(NotFound());
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Agenda.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        next(NotFound());
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Agenda({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      return savedPerson.toJSON();
    })
    .then((savedAndFormattedPerson) => response.json(savedAndFormattedPerson))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  Agenda.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedNote) => response.json(updatedNote))
    .catch((error) => next(error));
});

// error handlers

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "NotFoundError") {
    return response.status(404).json({ error: "person not found" });
  } else if (error.name === "ValidationError") {
    return response.status(409).json({ error: "Error: ", error });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
