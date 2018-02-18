import React, { Component, PureComponent } from 'react';
import classes from './Person.css';
import PropTypes from 'prop-types';


class Person extends PureComponent {
    // constructor(props) {
    //     super(props);
    // }

    componentWillReceiveProps(nextProps) {
        console.log('update');
    }

    // shouldComponentUpdate(nextProps, nextState) { // PureComponent уже имеет эту проверку встроенной
    //     return true; // если вернуть false то компонент не будет обновляться
    //     // return nextProps.persons !== this.props.persons; // - так повышаем производительность
    //     // так как обновляться будем только если изменились props.persons!!!
    // }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate() {
       // вызывается после обновления
    }

    componentDidMount() {
        this.inputElement.focus();
    }

    render() {
        return (
            <div className={classes.Person}>
                <p onClick={ this.props.myClick }>I'm a { this.props.name }! And I'm { this.props.age } years old!</p>
                <p>{ this.props.children }</p>
                {/* this.inputElement - ссылка на элемент */}
                <input
                    ref={(inp) => { this.inputElement = inp; } }
                    type="text"
                    onChange={ this.props.changed }
                    value={ this.props.name }/>
            </div>
        );
    }
}

Person.propTypes = {
    myClick: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
};


// const person = (props) => {
//
//     // const rnd = Math.random();
//     // if (rnd > 0.7) {
//     //     throw new Error( 'Something went wrong' );
//     // }
//
//     return (
//         <div className={classes.Person}>
//             <p onClick={ props.myClick }>I'm a { props.name }! And I'm { props.age } years old!</p>
//             <p>{ props.children }</p>
//             <input type="text" onChange={ props.changed } value={ props.name }/>
//         </div>
//     );
//
// };
export default Person;