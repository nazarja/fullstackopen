import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Heading = ({ text }) => <h2>{text}</h2>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ votes, anecdotes, selected, most }) => {
    const index = votes.indexOf(Math.max(...votes));

    return (
        most
            ?
            <div>
                <p>{anecdotes[index]}</p>
                <p>has {votes[index]} votes</p>
            </div>
            :
            <div>
                <p>{anecdotes[selected]}</p>
                <p>has {votes[selected]} votes</p>
            </div>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));


    const handleClick = (value) => {

        const increaseVotes = () => {
            let votesCopy = [...votes];
            votesCopy[selected] += 1;
            setVotes(votesCopy)
        }

        return () => {
            value === 'next'
                ?
                setSelected(Math.floor(Math.random() * anecdotes.length))
                :
                increaseVotes()
        };
    };

    return (
        <div>
            <Heading text="Anecdote of the day" />
            <Anecdote votes={votes} anecdotes={anecdotes} selected={selected} most={false} />
            <Button onClick={handleClick('vote')} text={"vote"} />
            <Button onClick={handleClick('next')} text={"next anecdote"} />
            <Heading text="Anecdote with the most votes" />
            <Anecdote votes={votes} anecdotes={anecdotes} selected={selected} most={true} />
        </div>
    );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
