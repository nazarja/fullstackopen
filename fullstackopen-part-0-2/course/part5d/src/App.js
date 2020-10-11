import React, { useState } from 'react';

const useField = (type) => {
	const [value, setValue] = useState('');

	const onChange = (event) => setValue(event.target.value);

	return {
		type, value, onChange
	}
};

const App = () => {
	const name = useField('text');
	const [born, setBorn] = useState('')
	const [height, setHeight] = useState('')

	return (
		<div>
			<form>
				name:
		  <input
					type={name.type}
					value={name.value}
					onChange={name.onChange}
				/>
				<br />
				birthdate:
		  <input
					type='date'
					value={born}
					onChange={(event) => setBorn(event.target.value)}
				/>
				<br />
				height:
		  <input
					type='number'
					value={height}
					onChange={(event) => setHeight(event.target.value)}
				/>
			</form>
			<div>
				{name.value} {born} {height}
			</div>
		</div>
	)
}
// const useCounter = () => {
// 	const [value, setValue] = useState(0);

// 	const increase = () => setValue(value + 1);
// 	const decrease = () => setValue(value - 1);
// 	const zero = () => setValue(0);

// 	return {
// 		value, increase, decrease, zero
// 	}
// };

// const App = (props) => {
// 	const counter = useCounter();

// 	return (
// 		<div>
// 			<div>{counter.value}</div>
// 			<button onClick={counter.increase}>
// 				plus
// 			</button>
// 			<button onClick={counter.decrease}>
// 				minus
// 			</button>
// 			<button onClick={counter.zero}>
// 				zero
// 			</button>
// 		</div>
// 	);
// };

export default App;
