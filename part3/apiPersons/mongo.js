const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argmuent: node mongo.js <password>",
  );
  process.exit(1);
}

const password = process.argv[2];

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

const url = `mongodb+srv://fullstack:${password}@cluster0.lurzutg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const agendaSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Agenda = mongoose.model("Agenda", agendaSchema);

if (process.argv.length === 3) {
  Agenda.find({})
    .then((result) => {
      if (result && result.length > 0) {
        result.forEach((person) => {
          console.log(person);
        });
      } else {
        console.log("No persons found in the database.");
      }
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error("Error fetching persons:", error);
      mongoose.connection.close();
    });
}

if (process.argv.length === 5) {
  const person = new Agenda({
    name: process.argv[3].toString(),
    number: process.argv[4].toString(),
  });
  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error("Error saving note ", error);
    });
}

if (process.argv.length > 5) {
  console.log("node mongo.js password name phonenumber");
  console.log("if name has blank spaces it must be enclosed in quotes");
  process.exit(1);
}
