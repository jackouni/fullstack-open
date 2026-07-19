import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const searchPersons = () => {
    if (!activeFilter()) return persons
    return persons.filter(person => person.name.includes(newFilter))
  }
  const activeFilter = () => newFilter.trim().length > 0
  const nameExists = (name) => persons.some(person => person.name === name)
  const numberExists = (num) => persons.some(person => person.number === num)

  const inputChangeHandler = (setter) => {
    return ((event) => setter(event.target.value))
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault();

    const name = newName;
    const number = newNumber;

    if (nameExists(name)) {
      alert(`${name} is already added to phonebook`)
    } else if (numberExists(number)) {
      alert(`${number} is already in phonebook`)
    } else {
      setPersons(persons.concat({ name, number, id: persons.length + 1 }));
    }

    setNewName('');
    setNewNumber('');
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
      <Persons persons={searchPersons()}/>
    </div>
  )
}

export default App