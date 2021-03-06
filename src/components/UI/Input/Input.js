import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;

    let inputClasses = [classes.inputElement];
    if (props.touched && props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
    }


    switch(props.elementype) {
        case('input'):
            inputElement = <input  onChange={props.changed}  className={inputClasses.join(' ')} {...props.elementconfig} value={props.value} />;
            break;
        case('area'):
            inputElement = <textarea  onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementconfig} value={props.value} />;
            break;
        case('select'):
            inputElement = (
                <select onChange={props.changed}  className={inputClasses.join(' ')} value={props.value}>
                    {props.elementconfig.options.map(
                        (option) => 
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    )}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.changed}  className={inputClasses.join(' ')} {...props.elementconfig} value={props.value}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;