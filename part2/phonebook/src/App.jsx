import { useState, useEffect } from 'react'
import personsService from './services/persons.js'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(setPersons)
  }, []);

  const searchPersons = () => {
    if (!activeFilter()) return persons
    return persons.filter(person => person.name.includes(newFilter))
  }

  const activeFilter = () => newFilter.trim().length > 0

  const inputChangeHandler = setter => ((event) => setter(event.target.value))

  const handleDeletion = (event) => {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('deleteBtn')) {
      window.confirm("Are you sure you want to delete?");

      const person = target.closest('.personContainer');
      personsService
        .destroy(person.id)
        .then(() => {
          console.log("Deletion successful");
          personsService
            .getAll()
            .then(setPersons)
        })
        .catch(() => {
          console.log("Deletion failed");
        })
    }
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault();

    personsService
      .getAll()
      .then(allPersons => {
        const names = allPersons.map(person => person.name)
        const numbers = allPersons.map(person => person.number)

        const nameExists = names.some(name => name === newName)
        const numberExists = numbers.some(number => number === newNumber)

        if (nameExists) {
          alert(`${newName} is already added to phonebook`)
        } else if (numberExists) {
          alert(`${newNumber} is already in phonebook`)
        } else {
          const newPerson = { name: newName, number: newNumber }
    
          personsService
            .create(newPerson)
            .then(addedPerson => {
              setPersons(persons.concat(addedPerson));
              setNewName('');
              setNewNumber('');
            })
        }
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        onChange={inputChangeHandler(setNewFilter)}
        value={newFilter}
      />

      <h3>Add a new person</h3>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        handlePersonSubmit={handlePersonSubmit}
        nameOnChange={inputChangeHandler(setNewName)}
        numberOnChange={inputChangeHandler(setNewNumber)}
      />

      <h3>Numbers</h3>
      <Persons persons={searchPersons()} deletionHandler={handleDeletion}/>
    </div>
  )
}

export default App