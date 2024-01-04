const express = require("express");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const numpersons = persons.length;
  const date = new Date().toString();
  response.end(`Phonebook has info for ${numpersons} people\n${date}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const personfind = persons.find((person) => person.id === id);
  if (personfind) {
    response.json(personfind);
  } else {
    response.status(404).json({ message: "Person not found" });
  }
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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
