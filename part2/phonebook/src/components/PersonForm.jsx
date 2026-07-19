const PersonForm = ({ 
  nameValue,
  numberValue,
  handlePersonSubmit,
  nameOnChange,
  numberOnChange,
}) => {
return (
    <form onSubmit={handlePersonSubmit} >
      <div>name: 
        <input 
          onChange={nameOnChange}
          value={nameValue}
        />
      </div>
      <div>number: 
        <input 
          onChange={numberOnChange}
          value={numberValue}
        />
      </div>

      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm
