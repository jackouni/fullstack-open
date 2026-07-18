import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (<button onClick={onClick}>{text}</button>)
}

const Title = ({ text }) => {
  return (<h1>{text}</h1>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votesObj = {}
  anecdotes.forEach((_, index) => votesObj[index] = 0);
   
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState({ ...votesObj });

  const randomIndexFrom = arr => Math.floor(Math.random() * arr.length);

  const handleVote = () => {
    const updatedVotes = { ...votes }
    updatedVotes[selected] += 1;
    setVote(updatedVotes);
  }

  const highestVoteAnecdote = () => {
    let highestVote = 0;

    for (const index in votes) {
      if (votes[index] > votes[highestVote]) highestVote = index;
    }

    return votes[highestVote] === 0 ? "No votes yet" : anecdotes[highestVote]
  }

  return (
    <div>
      <div>
        <Title text="Anecdote of the day"></Title>
        <p>{anecdotes[selected]}</p>
        <p>{`Has ${votes[selected]} votes`}</p>
        <Button 
          onClick={() => setSelected(randomIndexFrom(anecdotes))}
          text={"next anecdote"}
        />
        <Button
          onClick={handleVote}
          text={"vote"}
        />
      </div>

      <div>
        <Title text="Anecdote with most votes"></Title>
        <p>{highestVoteAnecdote()}</p>
      </div>
    </div>
  )
}

export default App