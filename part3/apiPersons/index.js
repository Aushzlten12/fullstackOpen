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
  const id = Number(request.params.id);
  const personfind = persons.find((person) => person.id === id);

  if (!personfind) {
    return response.status(404).json({ message: "Person not found" });
  }

  try {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ message: "Error" });
  }
});

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 10000);

  const body = request.body;

  if (!body.number || body.number.trim() === "") {
    return response.status(400).json({ error: "Number not be blank" });
  }
  if (!body.name || body.name.trim() === "") {
    return response.status(400).json({ error: "Name not be blank" });
  }
  if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(409).json({ error: "Name must be unique" });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: id,
  };
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
