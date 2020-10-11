import React, { useState, useEffect} from 'react';

const Notification = ({ notification }) => {

    return (
        <div> 
            <p>{notification}</p>
        </div>
    );
};

export default Notification;