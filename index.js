"use strict";
exports.__esModule = true;
require('dotenv').config();
var express = require('express');
var cors = require('cors');
var PhoneBook = require('./models/person.ts');
var app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.get('/api/persons', function (request, response, next) {
    PhoneBook.find({}).then(function (phoneBooks) {
        response.json(phoneBooks);
    })["catch"](function (e) { return next(e); });
});
app.get('/api/persons/:id', function (request, response, next) {
    PhoneBook.findById(request.params.id).then(function (phoneBook) {
        response.json(phoneBook);
    })["catch"](function (e) { return next(e); });
});
app.get('/info', function (req, res) {
    var requestTime = new Date();
    var phoneBooks = PhoneBook.find({}).then(function (phoneBooks) { return phoneBooks; });
    var responseData = "<p>Phonebook has info for " + phoneBooks.length + " people</p><p>" + requestTime + "</p>";
    res.send(responseData);
});
app.post('/api/persons/', function (request, response, next) {
    var body = request.body;
    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' });
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
    var phoneBook = new PhoneBook({
        name: body.name,
        number: body.number
    });
    phoneBook.save().then(function (savedPhoneBook) {
        response.json(savedPhoneBook);
    })["catch"](function (e) { return next(e); });
});
app["delete"]('/api/persons/:id', function (request, response, next) {
    PhoneBook.findByIdAndRemove(request.params.id).then(function (_) {
        response.json(204).end();
    })["catch"](function (error) { return next(error); });
    response.send(204).end();
});
var unknownEndpoint = function (request, response) {
    response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
var errorHandler = function (error, request, response, next) {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
app.use(errorHandler);
var PORT = process.env.PORT;
app.listen(PORT);
console.log("app is running in " + PORT);
