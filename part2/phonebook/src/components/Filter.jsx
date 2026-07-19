const Filter = ({ filterValue, onChange }) => {
  return (
    <div>filter shown with: 
      <input 
        onChange={onChange}
        value={filterValue}
      />
    </div>
  )
}

export default Filter
