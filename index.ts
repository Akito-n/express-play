import { notEqual } from "assert";

require('dotenv').config()

const express = require('express');
const cors = require('cors')
const PhoneBook = require('./models/person.ts')

const app = express();

app.use(cors())
app.use(express.static('build'))
app.use(express.json());

app.get('/api/persons', (request, response) => {
  PhoneBook.find({}).then(phoneBooks => {
    response.json(phoneBooks);
  })
});

app.get('/api/persons/:id', (request, response) => {
  PhoneBook.findById(request.params.id).then(phoneBook => {
    response.json(phoneBook)
  })
});

app.get('/info', (req, res) => {
  const requestTime = new Date();
  const phoneBooks = PhoneBook.find({}).then(phoneBooks => phoneBooks)
  const responseData = `<p>Phonebook has info for ${phoneBooks.length} people</p><p>${requestTime}</p>`;

  res.send(responseData);
});

app.post('/api/persons/', (request, response) => {
  const body = request.body;

  // const phoneBooks = PhoneBook.find({}).then(phoneBooks => phoneBooks)

  // if (!body.name) {
  //   response.status(400).json({ error: 'name is missing' });
  // } else if (!body.number) {
  //   response.status(400).json({ error: 'number is missing' });
  // } else if (phoneBooks.find((person) => person.name === body.name)) {
  //   response.status(400).json({ error: 'name is already exist' });
  // } else if (phoneBooks.find((person) => person.number === body.number)) {
  //   response.status(400).json({ error: 'number is already exist' });
  // }

  const phoneBook = new PhoneBook({
    name: body.name,
    number: body.number
  })

  phoneBook.save().then(savedPhoneBook => {
    response.json(savedPhoneBook)
  })
});

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);

//   console.log('delete');

//   persons = persons.filter((person) => person.id !== id);

//   response.send(204).end();
// });

const PORT = process.env.PORT
app.listen(PORT);
console.log(`app is running in ${PORT}`);
