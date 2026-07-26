require('dotenv').config()
const mongoose = require('mongoose')
const URI = process.env.MONGODB_URI

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const [, , , name, number] = process.argv

mongoose.set('strictQuery',false)
mongoose.connect(URI, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length === 3) {
  console.log("Phonebook:")
  const persons = Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })

} else {
  const person = new Person({
    name,
    number,
  })
  
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
