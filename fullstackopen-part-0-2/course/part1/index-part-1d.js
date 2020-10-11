import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const History = ({ allClicks }) => {
    return (
        !allClicks.length ?
            <p>The App is used by pressing Buttons</p>
            :
            <p>Button Press History: {allClicks.join(', ')}</p>
    )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;


const App = (props) => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'));
        setLeft(left + 1);
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        setRight(right + 1);
    }


    return (
        <div>
            <div>
                {left} &nbsp;
                <Button onClick={handleLeftClick} text="left" />
                <Button onClick={handleRightClick} text="right" />
                &nbsp; {right}
            </div>
            <History allClicks={allClicks} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));