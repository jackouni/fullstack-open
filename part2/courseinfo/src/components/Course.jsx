import Total from './Total.jsx'
import Header from './Header.jsx'
import Content from './Content.jsx'

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course