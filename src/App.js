import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

// Создать дочерний класс App от класса Component
class App extends Component {

    // state доступен только в компонентах, созданных через class __ extends Component !!!
    // если state меняется - DOM перерисовывается
    state = {
        persons: [
            { name: 'Max', age: 28 },
            { name: 'Oleg', age: 29 },
            { name: 'Tolik', age: 30 }
        ],
        otherState: 'some other value'
    };

    switchNameHandler = (newName) => {
        console.log('was clicked!');
        // !!! DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
        this.setState({ // state меняем только так (мерджим новый объект со стейтом)
            persons: [ // изменения коснуться только свойства persons
                { name: newName, age: 28 },
                { name: 'Oleg', age: 29 },
                { name: 'Tolik', age: 32 },
            ]
        });
    };

    nameChangeHandler = (event) => {
        this.setState({
            persons: [
                { name: 'Max', age: 28 },
                { name: event.target.value, age: 29 },
                { name: 'Tolik', age: 30 }
            ]
        });
    };

    // события которые можно слушать https://reactjs.org/docs/events.html#supported-events
    render() {

        const myStyles = {
            backgroundColor: '#e09b94',
            fontSize: '16px',
            font: 'Arial',
            padding: '10px',
            borderColor: '#c3776e',
            borderRadius: '4px',
            color: '#333333',
            cursor: 'pointer'
        };

        return (
            <div className="App">
                <h1>Hello world</h1>

                {/*<button onClick={ this.switchNameHandler.bind(this, 'Petya') }>Switch name</button>*/}
                <button style={myStyles} onClick={ () => this.switchNameHandler('Petya') }>Switch name</button>
                {/* Здесь анонимная функция возвращает this.switchNameHandler('Petya') то есть
                можно писать () => { return this.switchNameHandler('Petya'); } - просто сокращенная запись в строку*/}

                <Person name={ this.state.persons[0].name } age={ this.state.persons[0].age } />

                <Person
                    name={ this.state.persons[1].name }
                    age={ this.state.persons[1].age }
                    myClick={ this.switchNameHandler.bind(this, 'Vasiliy') }
                    changed={this.nameChangeHandler}
                    >My Hobbies: Racing
                </Person>

                <Person name={ this.state.persons[2].name } age={ this.state.persons[2].age } />
                {/*<Person name="Max" age="28" />*/}
                {/*<Person name="Oleg" age="29">My Hobbies: Racing</Person>*/}
                {/*<Person name="Tolik" age="30" />*/}
            </div>
        );
        // То же самое можно получить так:
        // Аргументы: первый элемент, его опции, далее через запятую все дочерние элементы
        // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello world'));
    }
}

export default App;
