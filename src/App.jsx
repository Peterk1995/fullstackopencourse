const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName} </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Exercises = (props) => {
  return (
    <div>
      <p>
       Number of Exercises {props.totalExercises} 
      </p>
    </div>
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

  return (
    <div>
      <Header courseName = {course} />
      <Content part = {part1} exercises={exercises1}/>
      <Content part = {part2} exercises={exercises2}/>
      <Content part = {part3} exercises={exercises3}/>
      <Exercises totalExercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App