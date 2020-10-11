import React, { useState, useImperativeHandle } from 'react';

// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);
	const toggleVisibility = () => setVisible(!visible);
	useImperativeHandle(ref, () => { return { toggleVisibility }; });

	return (
		<>
			{
				visible
					? (
						<div>
							{props.children}
							<button className="redButton" onClick={toggleVisibility}>Cancel</button>
						</div>
					)
					: (
						<button onClick={toggleVisibility}>{props.label}</button>
					)
			}
		</>
	);
});

export default Togglable;