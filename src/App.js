import React, {Component} from 'react';
import './App.css';

import Person from './Person/Person';

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
        const myStyles = {
            backgroundColor: '#e09b94',
            fontSize: '16px',
            fontFamily: 'Arial',
            padding: '10px',
            borderColor: '#c3776e',
            borderRadius: '4px',
            color: '#333333',
            cursor: 'pointer',
            marginRight: '20px',
            outline: 'none',
        };
        const newBlockStyle = {
            border: '2px solid #597089',
            color: '#597089',
            width: '200px',
            height: '100px',
            padding: '10px',
            margin: '20px auto',
        };

        let persons = null;
        if (this.state.showPersons) {
            persons = (<div>
                {this.state.persons.map((person, index) => {
                    return <Person
                        myClick={() => this.deletePersonHandler(index)}
                        name={person.name}
                        age={person.age}
                        key={person.id}
                        changed={(event) => this.nameChangeHandler(event, person.id)}/>
                })}
            </div>);
            myStyles.backgroundColor = '#1c5093';
            myStyles.color = '#ffffff';
            myStyles.borderColor = '#243e61';
        }

        let classes = [];
        if (this.state.persons.length <= 2) classes.push('red');
        if (this.state.persons.length <= 1) classes.push('bold');

        return (
            <div className="App">
                <h1>Hello world</h1>
                <p className={classes.join(' ')}>This is really working</p>

                <button key='q2' style={myStyles} onClick={() => this.switchNameHandler('Petya')}>Switch name</button>

                <button key='q1' style={myStyles} onClick={this.togglePersonsHandler}> SHOW/HIDE</button>

                {persons}

            </div>
        );
    }
}

export default App;