const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return <Part name={part.name} exercises={part.exercises}/>
      })}
    </div>
  )
}

const Total = ({ exercises }) => {
  const total = exercises.reduce((sum, n) => sum + n, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    {name: part1, exercises: exercises1},
    {name: part2, exercises: exercises2},
    {name: part3, exercises: exercises3},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App