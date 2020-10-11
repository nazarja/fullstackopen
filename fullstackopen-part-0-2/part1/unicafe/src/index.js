import React, { useState } from 'react';
import ReactDom from 'react-dom';


const Heading = ({ text }) => <h2>{text}</h2>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ stats }) => {
    stats.all = (stats.good + stats.neutral + stats.bad);
    stats.average = (stats.good - stats.bad) / stats.all;
    stats.positive = ((stats.good / stats.all) * 100) + ' %';

    return (
        stats.all
            ?
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(stats).map((stat, i) => <Statistic key={i} text={stat} value={stats[stat]} />)}
                </tbody>
            </table>
            :
            <p>No feedback given</p>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick = (value) => () => {
        return (
            value === 'good'
                ?
                setGood(good + 1)
                :
                value === 'neutral'
                    ?
                    setNeutral(neutral + 1)
                    :
                    setBad(bad + 1)
        );
    }


    return (
        <div>
            <Heading text="Give Feedback" />
            <Button onClick={handleClick('good')} text={'good'} />
            <Button onClick={handleClick('neutral')} text={'neutral'} />
            <Button onClick={handleClick('bad')} text={'bad'} />
            <Heading text="Statistics" />
            <Statistics stats={{ good, neutral, bad }} />
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('root'));