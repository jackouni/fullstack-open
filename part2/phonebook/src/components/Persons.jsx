const Persons = ({ persons, deletionHandler }) => {
  console.log(persons)
  return (
    <div onClick={deletionHandler}>
     {persons.map(person => {
        return (
          <div className="personContainer" id={person.id} key={person.id}>
            <p>
              {person.name} → {person.number}
            </p>
            <button className="deleteBtn">Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Persons
