import { useState } from "react"

const Button = ({ onClick, txt }) => <button onClick={onClick}>{txt}</button>
const Display = ({counter}) => <div>{counter}</div>

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increaseByOne}
        txt='plus'
      />
      <Button
        onClick={setToZero}
        txt='zero'
      />     
      <Button
        onClick={decreaseByOne}
        txt='minus'
      />           
    </div>
  )
}

export default App