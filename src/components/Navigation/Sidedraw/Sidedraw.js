import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedraw.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const Sidedraw = (props) => {
    let attachedClasses = [classes.Sidedraw, classes.Close];
        if (props.opened) {
            attachedClasses = [classes.Sidedraw, classes.Open]
        }
    return (
        <Aux>
            <Backdrop show={props.opened} clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav >
                    <NavigationItems/>
                </nav>
        </div>
        </Aux>
      
    );
}

export default Sidedraw;