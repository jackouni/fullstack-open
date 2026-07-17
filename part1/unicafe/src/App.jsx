import { useState } from 'react'

const Title = ({ text }) => (<h1>{text}</h1>)

const Button = ({ text, onClick }) => {
  return (<button onClick={onClick}>{text}</button>)
}

const StatisticLine = ({ text, val }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{val}</td>
    </tr>
  )
}

const Statistics = ({ stats }) => {
  if (stats.length === 0) return (<p>No feedback given</p>)

  return (
    <table>
      <tbody>
        {stats.map(stat => {
          return (
            <StatisticLine
            key={stat.text}
            text={stat.text}
            val={stat.val}
            />
          )
        })}
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral;
  const score = good - bad;
  const scoreAverage = all > 0 ? score / all : "";
  const percent = (metric) =>  all > 0 ? `${metric / all * 100}%` : "";

  const stats = all === 0 ? [] : [
    { text: "good", val: good },
    { text: "neutral", val: neutral },
    { text: "bad", val: bad },
    { text: "all", val: all },
    { text: "average", val: scoreAverage },
    { text: "positive", val: percent(good) },
  ];

  return (
    <div>
      <div>
        <Title text="give feedback"/>
        <Button 
          text={"good"} 
          onClick={() => setGood(good + 1)}
        />

        <Button 
          text={"neutral"} 
          onClick={() => setNeutral(neutral + 1)}
        />

        <Button 
          text={"bad"} 
          onClick={() => setBad(bad + 1)}
        />

        <Button 
          text={"reset"} 
          onClick={() => {
            setBad(0)
            setGood(0)
            setNeutral(0)
          }}
        />
      </div>


      <div>
        <Title text={"statistics"}/>
        <Statistics stats={stats}/>
      </div>
    </div>
  )
}

export default App