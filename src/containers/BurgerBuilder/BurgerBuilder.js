import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
//css
import classes from './BurgerBuilder.css';
//Axios
import {axiosPost,axiosRequestIngredients} from '../../Axios';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice: 4,
        nIngredients:0,
        purchasable:false,
        loading: false,
        error:false
    }
    componentDidMount() {
        axiosRequestIngredients.get('').then(
            (ingredients) => {
                this.setState({...this.state, ingredients:ingredients.data});
            }
        ).catch(
            error => {
                this.setState({error:true});
            }
        );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.isDisabled(type);
        this.ingredientsContent(updatedIngredients);
    }

    deleteIngredientHandler = ( type ) => {
     
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;
        updatedIngredients[type] = newCount;
        const price = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - price;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.ingredientsContent(updatedIngredients);
    }

    isDisabled = ( type ) => {
        return (this.state.ingredients[type] > 0 ) ? false: true;
    }

    isEnough = (type) => {
        return (this.state.ingredients[type] > 3) ? true : false;
    }

    formatPrice = () => {

        let formatPrice = this.state.totalPrice;
        if (formatPrice.toString().length > 5) {
            return formatPrice.toString().slice(0,3);
        } else {
            return formatPrice;
        }
        
    }

    ingredientsContent = (ingredients) => {
        let sum = Object.keys(ingredients).map(
            inKey =>  ingredients[inKey]
            )
            .reduce((total, now) => {
                return total + now;
            });
        this.setState({nIngredients: sum});
    }

    purchaseHandler = () => {
        this.setState({purchasable:true});
        

    }

    purchaseCancelHandler = () => {
        this.setState({purchasable:false});
    }

    continueHandler = () => {
       
        const queryParams = [];
        for (let ingredient in  this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredient) + '=' + this.state.ingredients[ingredient]);
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/order',
            search:'?'+queryString
        });
   
    }
    

    render () {

        
     
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let content = null;
        if (this.state.loading) {
            content = <Spinner />
        } else {
            if(this.state.ingredients) {
                content = <BurgerSummary 
                loading ={this.state.loading}
                cancelHandler = {this.purchaseCancelHandler}
                continueHandler = {this.continueHandler}
                ingredients={this.state.ingredients}
                cost = {this.formatPrice()}
                />;
            }
           
        }
        let burger = this.state.error ? <p>Error ingredients can't be loaded</p> :<Spinner />;
        if (this.state.ingredients) {
            burger = 
            <Aux>
            <Burger  ingredients={this.state.ingredients} />
            <h1 className={classes.Price}>Total Price: {this.formatPrice()}$</h1>
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                deleteIngredient = {this.deleteIngredientHandler}
                disabled = {this.isDisabled}
                enough = {this.isEnough}
                ordered={this.purchaseHandler}
                orderD = {this.state.nIngredients < 1}
            />
            </Aux>
        }
        return (
            <Aux>
               
                <Modal show={this.state.purchasable} modalClosed={this.purchaseCancelHandler}>
                    {content}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosPost);