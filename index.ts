const express = require('express')
const app = express()

interface Person {
  name: string,
  number: string,
  id: number
}

app.use(express.json())

let persons: Person[] =  [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]


  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    const requestTime = new Date()
    const responseData = `<p>Phonebook has info for ${persons.length} people</p><p>${requestTime}</p>`
    res.send(responseData)
  })


const PORT = 3003
app.listen(PORT)
console.log(`app is running in ${PORT}`)
