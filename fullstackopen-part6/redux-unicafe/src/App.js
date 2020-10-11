import React from 'react';
import Statistics from './components/Statistics';

const App = ({ store }) => {
    const good = () => store.dispatch({ type: 'GOOD' });
    const neutral = () => store.dispatch({ type: 'NEUTRAL' });
    const bad = () => store.dispatch({ type: 'BAD' });
    const resetStats = () => store.dispatch({ type: 'RESET_STATS' });

    return (
        <div>
            <h1>Feedback</h1>
            <button onClick={good}>Good</button>
            <button onClick={neutral}>Neutral</button>
            <button onClick={bad}>Bad</button>
            <button onClick={resetStats}>Reset Stats</button>
            <Statistics store={store} />
        </div>
    );
};

export default App;