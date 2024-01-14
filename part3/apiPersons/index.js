require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
const Agenda = require("./models/agenda");
const app = express();

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

app.get("/api/persons", (request, response) => {
  Agenda.find({}).then((notes) => {
    response.json(notes);
  });
});

// app.get("/info", (request, response) => {
//   const numpersons = persons.length;
//   const date = new Date().toString();
//   response.end(`Phonebook has info for ${numpersons} people\n${date}`);
// });

app.get("/api/persons/:id", (request, response) => {
  Agenda.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Agenda.findByIdAndDelete(request.params.id).then((result) => {
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: "person not found" });
    }
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Agenda({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// error handlers

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
