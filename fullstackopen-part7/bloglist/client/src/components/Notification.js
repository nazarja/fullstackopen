import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = props => {

	return (
		props.notification.message
			? (
				<Alert variant={props.notification.type}>
					{props.notification.message}
				</Alert>
			)
			: null
	);
};

const mapStateToProps = state => {
	return {
		notification: state.notification
	};
};

export default connect(mapStateToProps, null)(Notification);