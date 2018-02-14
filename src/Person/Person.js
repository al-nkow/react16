import React from 'react';
import './Person.css';

const person = (props) => {
    // !!! When using class-based components, it's this.props !!!

    return (
        <div className="Person">
            <p onClick={ props.myClick }>I'm a { props.name }! And I'm { props.age } years old!</p>
            <p>{ props.children }</p> {/* - выведет все внутреннее содержимое блока - типа transclude в Angular */}
            <input type="text" onChange={ props.changed } value={ props.name }/> {/* event будет отправлен автоматически */}
        </div>
    );
    // return <p>I'm a person! And I'm { Math.floor(Math.random() * 30) } years old!</p>
};

export default person;