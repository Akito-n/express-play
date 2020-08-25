import { notEqual } from "assert";
import { nextTick } from "process";

require('dotenv').config()

const express = require('express');
const cors = require('cors')
const PhoneBook = require('./models/person.ts')

const app = express();

app.use(cors())
app.use(express.static('build'))
app.use(express.json());

app.get('/api/persons', (request, response, next) => {
  PhoneBook.find({}).then(phoneBooks => {
    response.json(phoneBooks);
  }).catch(e => next(e))
});

app.get('/api/persons/:id', (request, response, next) => {
  PhoneBook.findById(request.params.id).then(phoneBook => {
    response.json(phoneBook)
  }).catch(e => next(e))
});

app.get('/info', (req, res) => {
  const requestTime = new Date();
  const phoneBooks = PhoneBook.find({}).then(phoneBooks => phoneBooks)
  const responseData = `<p>Phonebook has info for ${phoneBooks.length} people</p><p>${requestTime}</p>`;

  res.send(responseData);
});

app.post('/api/persons/', (request, response, next) => {
  const body = request.body;

  if(body.name === undefined){
    return response.status(400).json({error: 'content missing'})
  }

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
  }).catch(e => next(e))
});

app.delete('/api/persons/:id', (request, response, next) => {
  PhoneBook.findByIdAndRemove(request.params.id).then(_ => {
    response.json(204).end()
  }).catch(error => next(error))

  response.send(204).end();
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT);
console.log(`app is running in ${PORT}`);
