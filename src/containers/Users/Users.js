import React, {Component} from 'react';
// import { Route } from 'react-router-dom';

class Users extends Component {
    render () {
        console.log('>>>> users >>>', this.props);
        const styles = {
            color: 'blue',
            padding: '20px',
            fontFamily: 'Arial'
        };
        return (
            <h1 style={styles}>USERS</h1>
        );
    }
}

export default Users;