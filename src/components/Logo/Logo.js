import React from 'react';
import log from '../../assets/img/burger-logo.png';
import classes from './Logo.css';
const logo = (props) => (
    <div className={classes.Logo}>
        <img src={log} alt="logo"/>
    </div>
);

export default logo;