const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// HELPERS //
const generateId = () => {
  return Math.floor(Math.random() * 999_000_000_000);
}

const nameExists = (name) => {
  return persons.some(person => person.name === name)
}

// ROUTES //
app.get('/api/persons', (req, res) => {
  res.json(persons)
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
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (request, response) => {
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
  
  if (nameExists(name)) {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    number: body.content.number,
    name: body.content.name,
  }

  persons = persons.concat(person)

  response.json(person)
})

// RUN THIS PROCESS ON A PORT //
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`)
})