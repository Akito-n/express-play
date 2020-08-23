var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
var persons = [
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
app.get('/api/persons', function (request, response) {
    response.json(persons);
});
app.get('/api/persons/:id', function (request, response) {
    var id = Number(request.params.id);
    console.log(id);
    var person = persons.find(function (person) { return person.id === id; });
    console.log(person);
    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
});
app.get('/info', function (req, res) {
    var requestTime = new Date();
    var responseData = "<p>Phonebook has info for " + persons.length + " people</p><p>" + requestTime + "</p>";
    res.send(responseData);
});
var generateId = 1 + Math.floor(Math.random() * 1000);
app.post('/api/persons/', function (request, response) {
    var body = request.body;
    if (!body.name) {
        response.status(400).json({ error: 'name is missing' });
    }
    else if (!body.number) {
        response.status(400).json({ error: 'number is missing' });
    }
    else if (persons.find(function (person) { return person.name === body.name; })) {
        response.status(400).json({ error: 'name is already exist' });
    }
    else if (persons.find(function (person) { return person.number === body.number; })) {
        response.status(400).json({ error: 'number is already exist' });
    }
    var person = {
        name: body.name,
        number: body.number,
        id: generateId
    };
    response.json(person);
});
app["delete"]('/api/persons/:id', function (request, response) {
    var id = Number(request.params.id);
    console.log('delete');
    persons = persons.filter(function (person) { return person.id !== id; });
    response.send(204).end();
});
var PORT = process.env.PORT || 3008;
app.listen(PORT);
console.log("app is running in " + PORT);
