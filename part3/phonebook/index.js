require('dotenv').config()
const express = require("express")
var morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// HELPERS //
const generateId = () => {
  return Math.floor(Math.random() * 999_000_000_000);
}

const nameExists = (name) => {
  return Person.find({}).then(persons => {
    return persons.some(person => person.name === name)
  })
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// ROUTES //
app.get('/api/persons', (_, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const body = `
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${today}</p>
  `
  res.send(body)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
    .catch(error => {
      console.log(error.message)
      res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', async (request, response) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const { name, number } = body.content

  if (!number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (!name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  
  try {
    const existing = await Person.findOne({ name })

    if (existing) {
      return response.status(400).json({ error: 'name must be unique' })
    }

    const savedPerson = await new Person({ name, number }).save()
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

// MIDDLEWARE TO CATCH UNKNOWN ENDPOINTS //
app.use(unknownEndpoint)

// RUN THIS PROCESS ON A PORT //
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})