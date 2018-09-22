import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Sidedraw/Menu/Menu';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu opened={props.opened }>Menu</Menu>
        <Logo/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>

    </header>
)

export default toolbar;