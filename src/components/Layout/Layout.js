import React, {Component} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Sidedraw from '../Navigation/Sidedraw/Sidedraw';
class Layout extends Component { 

    state = {
        show: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({show:false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState(
            (prevState) => {
                return {show: !prevState.show}
            }
        );
    }
    render() {
        return (
        <Aux>
            <Toolbar opened= {this.sideDrawerOpenedHandler}></Toolbar>
            <Sidedraw closed = {this.sideDrawerClosedHandler} opened={this.state.show}></Sidedraw>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }

}

export default Layout;