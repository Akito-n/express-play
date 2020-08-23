const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors())

interface Person {
  name: string;
  number: string;
  id: number;
}

app.use(express.json());

let persons: Person[] = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  console.log(person);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get('/info', (req, res) => {
  const requestTime = new Date();
  const responseData = `<p>Phonebook has info for ${persons.length} people</p><p>${requestTime}</p>`;

  res.send(responseData);
});

const generateId = 1 + Math.floor(Math.random() * 1000);

app.post('/api/persons/', (request, response) => {
  const body = request.body;

  if (!body.name) {
    response.status(400).json({ error: 'name is missing' });
  } else if (!body.number) {
    response.status(400).json({ error: 'number is missing' });
  } else if (persons.find((person) => person.name === body.name)) {
    response.status(400).json({ error: 'name is already exist' });
  } else if (persons.find((person) => person.number === body.number)) {
    response.status(400).json({ error: 'number is already exist' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId
  };

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  console.log('delete');

  persons = persons.filter((person) => person.id !== id);

  response.send(204).end();
});

const PORT = process.env.PORT || 3008;
app.listen(PORT);
console.log(`app is running in ${PORT}`);
