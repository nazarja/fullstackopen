import React from 'react';

const Notification = ({ notification }) => {

	return (
		notification
			?
			<div className={notification.type}>
				<p>{notification.message}</p>
			</div>
			: null
	);
};

export default Notification;