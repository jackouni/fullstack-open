const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const [, , pw, name, number] = process.argv

const url = `mongodb+srv://jacksebbenswe_db_user:${pw}@phonebook.es3jtde.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

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
