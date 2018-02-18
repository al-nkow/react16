import React from 'react';
import classes from './Cockpit.css';

import Aux from '../hoc/Aux';

const cockpit = (props) => {

    let assignedClasses = [];
    if (props.persons.length <= 2) assignedClasses.push( classes.red );
    if (props.persons.length <= 1) assignedClasses.push( classes.bold );

    return (
        // можно просто обернуть в Aux
        <Aux>
            <h1>Hello world</h1>
            <p className={assignedClasses.join(' ')}>This is really working</p>
            <button
                className={classes.Button + (props.btnClass || '')}
                key='q2'
                onClick={() => props.switched('Petya')}>Switch name</button>
            <button
                className={classes.Button + (props.btnClass || '')}
                key='q1'
                onClick={props.toggled}> SHOW/HIDE</button>
        </Aux>
    );

};
export default cockpit;