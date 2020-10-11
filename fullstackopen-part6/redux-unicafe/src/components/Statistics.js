import React from 'react';
import Statistic from './Statistic';


const Statistics = ({ store }) => {
    const all = (store.getState().good + store.getState().neutral + store.getState().bad);
    const average = (store.getState().good - store.getState().bad) / all;
    const positive = ((store.getState().good / all) * 100) + ' %';
    const stats = { all, average, positive };

    return (
        all
            ?
            <>
                <h2>Statistics</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(store.getState()).map((stat, i) => <Statistic key={i} text={stat} value={store.getState()[stat]} />)}
                        {Object.keys(stats).map((stat, i) => <Statistic key={i} text={stat} value={stats[stat]} />)}
                    </tbody>
                </table>
            </>
            :
            <p>No feedback given</p>
    );
};

export default Statistics;