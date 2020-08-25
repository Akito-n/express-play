"use strict";
exports.__esModule = true;
require('dotenv').config();
var express = require('express');
var cors = require('cors');
var PhoneBook = require('./models/person.js');
var app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.get('/api/persons', function (request, response) {
    PhoneBook.find({}).then(function (phoneBooks) {
        response.json(phoneBooks);
    });
});
app.get('/api/persons/:id', function (request, response) {
    PhoneBook.findById(request.params.id).then(function (phoneBook) {
        response.json(phoneBook);
    });
});
app.get('/info', function (req, res) {
    var requestTime = new Date();
    var phoneBooks = PhoneBook.find({}).then(function (phoneBooks) { return phoneBooks; });
    var responseData = "<p>Phonebook has info for " + phoneBooks.length + " people</p><p>" + requestTime + "</p>";
    res.send(responseData);
});
app.post('/api/persons/', function (request, response) {
    var body = request.body;
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
    var phoneBook = new PhoneBook({
        name: body.name,
        number: body.number
    });
    phoneBook.save().then(function (savedPhoneBook) {
        response.json(savedPhoneBook);
    });
});
// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   console.log('delete');
//   persons = persons.filter((person) => person.id !== id);
//   response.send(204).end();
// });
var PORT = process.env.PORT;
app.listen(PORT);
console.log("app is running in " + PORT);
