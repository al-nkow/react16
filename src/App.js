import React, {Component} from 'react';
import classes from './App.css';

import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

    state = {
        persons: [
            {id: 'dg4hfyf78j4', name: 'Max', age: 28},
            {id: 'fgfghrr749j', name: 'Oleg', age: 29},
            {id: '0493hhd3msn', name: 'Tolik', age: 30}
        ],
        otherState: 'some other value',
        showPersons: false,
    };

    // delete element by clicking on it
    deletePersonHandler = (personIndex) => {
        const persons = this.state.persons.slice();
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    switchNameHandler = (newName) => {
        this.setState({
            persons: [
                {id: 'dg4hfyf78j4', name: 'Vasiliy', age: 33},
                {id: 'fgfghrr749j', name: 'Petya', age: 34},
                {id: '0493hhd3msn', name: 'Stas', age: 35}
            ]
        });
    };

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });
        const person = {...this.state.persons[personIndex]};
        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;
        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    render() {

        let persons = null;
        let btnClass = '';


        if (this.state.showPersons) {
            persons = (<div>
                {this.state.persons.map((person, index) => {
                    return <ErrorBoundary key={person.id}><Person
                        myClick={() => this.deletePersonHandler(index)}
                        name={person.name}
                        age={person.age}
                        // key={person.id}
                        changed={(event) => this.nameChangeHandler(event, person.id)}/></ErrorBoundary>
                })}
            </div>);
            btnClass = classes.Red;
        }

        let assignedClasses = [];
        if (this.state.persons.length <= 2) assignedClasses.push( classes.red );
        if (this.state.persons.length <= 1) assignedClasses.push( classes.bold );

        return (
            <div className={classes.App}>
                <h1>Hello world</h1>
                <p className={assignedClasses.join(' ')}>This is really working</p>

                <button className={btnClass} key='q2' onClick={() => this.switchNameHandler('Petya')}>Switch name</button>

                <button className={btnClass} key='q1' onClick={this.togglePersonsHandler}> SHOW/HIDE</button>

                {persons}

            </div>
        );
    }
}

export default App;