import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';

import Person from './Person/Person';

// Создать дочерний класс App от класса Component
class App extends Component {

    // state доступен только в компонентах, созданных через class __ extends Component !!!
    // если state меняется - DOM перерисовывается
    state = {
        persons: [
            { id: 'dg4hfyf78j4', name: 'Max', age: 28 },
            { id: 'fgfghrr749j', name: 'Oleg', age: 29 },
            { id: '0493hhd3msn', name: 'Tolik', age: 30 }
        ],
        otherState: 'some other value',
        showPersons: false,
    };

    // delete element by clicking on it
    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons // - так делать нельзя!!!! надо создавать копию!!!
        // так как массивы и объекты - это ссылочные типы - нам нужно создать копию массива перед манипуляциями!
        const persons = this.state.persons.slice(); // так создается копия массива (пустой .slice())
        // const persons = [...this.state.persons]; - еще один вариант создания копии массива!
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
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

    // nameChangeHandler = (event) => {
    //     this.setState({
    //         persons: [
    //             { name: 'Max', age: 28 },
    //             { name: event.target.value, age: 29 },
    //             { name: 'Tolik', age: 30 }
    //         ]
    //     });
    // };
    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });
        const person = { ...this.state.persons[personIndex] }; // создаем копию объекта
        // const person = Object.assign({}, this.state.persons[personIndex]); - или так копию делаем
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
    };

    // события которые можно слушать https://reactjs.org/docs/events.html#supported-events
    render() { // render выполняется при каждой смене стейта!

        console.log('rendered!');

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
            ':hover': {
                backgroundColor: '#aae056',
                color: '#000000',
            }
        };

        const newBlockStyle = {
            border: '2px solid #597089',
            color: '#597089',
            width: '200px',
            height: '100px',
            padding: '10px',
            margin: '20px auto',
        };

        // аналог ng-if
        let persons = null;
        if (this.state.showPersons) {
            persons = (<div>
                <div style={newBlockStyle}> new person </div>
                <div style={newBlockStyle}> new person </div>
                <div style={newBlockStyle}> new person </div>
            </div>);
            myStyles.backgroundColor = '#1c5093';
            myStyles.color = '#ffffff';
            myStyles.borderColor = '#243e61';
            myStyles[':hover'] = {
                backgroundColor: '#1c5093',
                color: 'green'
            }
        }

        // let classes = ['red', 'bold'].join(' ');
        let classes = [];
        if (this.state.persons.length <= 2) {
            classes.push('red');
        }
        if (this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
            <StyleRoot>{/* - оборачиваем, чтобы можно было использовать медиазапросы и трансформации в инлайн стилях*/}
                <div className="App">
                    <h1>Hello world</h1>
                    <p className={ classes.join(' ') }>This is really working</p>

                    {/*<button onClick={ this.switchNameHandler.bind(this, 'Petya') }>Switch name</button>*/}
                    <button key='q2' style={myStyles} onClick={ () => this.switchNameHandler('Petya') }>Switch name</button>
                    {/* Здесь анонимная функция возвращает this.switchNameHandler('Petya') то есть
                    можно писать () => { return this.switchNameHandler('Petya'); } - просто сокращенная запись в строку*/}

                    <button key='q1' style={myStyles} onClick={ this.togglePersonsHandler }> SHOW/HIDE </button>


                    { this.state.showPersons ?
                        <div>

                            {
                                this.state.persons.map((person, index) => {
                                    return <Person
                                        myClick={ () => this.deletePersonHandler(index) }
                                        name={ person.name }
                                        age={ person.age }
                                        // key={ index }
                                        key={ person.id }
                                        changed={ (event) => this.nameChangeHandler(event, person.id) } />
                                })
                            }

                            {/*<Person name={ this.state.persons[0].name } age={ this.state.persons[0].age } />*/}
                            {/*<Person*/}
                            {/*name={ this.state.persons[1].name }*/}
                            {/*age={ this.state.persons[1].age }*/}
                            {/*myClick={ this.switchNameHandler.bind(this, 'Vasiliy') }*/}
                            {/*changed={this.nameChangeHandler}*/}
                            {/*>My Hobbies: Racing*/}
                            {/*</Person>*/}
                            {/*<Person name={ this.state.persons[2].name } age={ this.state.persons[2].age } />*/}

                            {/*<Person name="Max" age="28" />*/}
                            {/*<Person name="Oleg" age="29">My Hobbies: Racing</Person>*/}
                            {/*<Person name="Tolik" age="30" />*/}
                        </div> : null
                    }

                    { persons } {/* - рекомендуется именно так пользоваться аналогом ng-if */}

                </div>
            </StyleRoot>
        );
        // То же самое можно получить так:
        // Аргументы: первый элемент, его опции, далее через запятую все дочерние элементы
        // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello world'));
    }
}

// export default App;
export default Radium(App); // Radium - чтобы можно было добавлять псевдоклассы и медиазапросы в инлайновые стили
