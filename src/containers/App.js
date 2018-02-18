import React, {PureComponent} from 'react';
import classes from './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Route, Link } from 'react-router-dom';

// import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../components/hoc/WithClass';
// import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

import Users from './Users/Users';

class App extends PureComponent {

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

        console.log('>>>>', this.props);

        let persons = null;
        let btnClass = '';


        if (this.state.showPersons) {
            persons = <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangeHandler}
                    />
                {/*
                {this.state.persons.map((person, index) => {
                    return <ErrorBoundary key={person.id}><Person
                        myClick={() => this.deletePersonHandler(index)}
                        name={person.name}
                        age={person.age}
                        changed={(event) => this.nameChangeHandler(event, person.id)}/></ErrorBoundary>
                })} */}
            btnClass = classes.Red;
        }

        // let assignedClasses = [];
        // if (this.state.persons.length <= 2) assignedClasses.push( classes.red );
        // if (this.state.persons.length <= 1) assignedClasses.push( classes.bold );

        return (

        <BrowserRouter>
            <WithClass classes={classes.App}>


                <header className={classes.navigate}>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/users/212345">User id=212345</Link></li>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to={{
                                pathname: 'users',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>Options added</Link></li>
                            {/*<li><a href="/">Home</a></li>*/}
                            {/*<li><a href="/users/212345">User id=212345</a></li>*/}
                            {/*<li><a href="/users">Users</a></li>*/}
                        </ul>
                    </nav>
                </header>

                {/*<Route path="/users" exact render={() => <Users/> }></Route>*/}
                <Route path="/users" exact component={Users}></Route>
                <Route path="/users" render={() => <h2>Ooooops</h2> }></Route>



                <button
                    onClick={() => { this.setState({showPersons: true}); } }
                >Show persons</button>
                <Cockpit
                    persons={this.state.persons}
                    btnClass={btnClass}
                    switched={this.switchNameHandler}
                    toggled={this.togglePersonsHandler}/>
                {/*<h1>Hello world</h1>*/}
                {/*<p className={assignedClasses.join(' ')}>This is really working</p>*/}

                {/*<button className={btnClass} key='q2' onClick={() => this.switchNameHandler('Petya')}>Switch name</button>*/}

                {/*<button className={btnClass} key='q1' onClick={this.togglePersonsHandler}> SHOW/HIDE</button>*/}

                {persons}

            </WithClass>
        </BrowserRouter>


        );
    }
}
export default App;