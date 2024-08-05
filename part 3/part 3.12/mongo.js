const mongoose = require('mongoose');

// Replace with your actual connection string and password
const password = process.argv[2];
const url = `mongodb+srv://grey:${password}@cluster0.ph8uczh.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // Display all entries
  Person.find({})
    .then(persons => {
      console.log('phonebook:');
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error retrieving data:', error.message);
      mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
  // Add new entry
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });

  person.save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error saving data:', error.message);
      mongoose.connection.close();
    });
} else {
  console.log('Invalid number of arguments');
  mongoose.connection.close();
}
