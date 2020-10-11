import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Display = ({ counter }) => <p>{counter}</p>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = (props) => {
    const [counter, setCounter] = useState(0);
    const setToValue = (value) => () => setCounter(value);


    return (
        <div>
            <Display counter={counter} />
            <Button onClick={setToValue(counter + 1)} text="Increase Counter" />
            <Button onClick={setToValue(counter - 1)} text="Decrease Counter" />
            <Button onClick={setToValue(0)} text="Reset Counter" />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));