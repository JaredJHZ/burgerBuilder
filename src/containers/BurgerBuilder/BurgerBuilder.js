import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary';
//css
import classes from './BurgerBuilder.css';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        nIngredients:0,
        purchasable:false
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
        console.log(newCount);
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
        alert('Success!');
        this.setState({purchasable:false});
     
    }
    

    render () {
     
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasable} modalClosed={this.purchaseCancelHandler}>
                    <BurgerSummary 
                    cancelHandler = {this.purchaseCancelHandler}
                    continueHandler = {this.continueHandler}
                    ingredients={this.state.ingredients}
                    cost = {this.formatPrice()}
                    />
                </Modal>
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
        );
    }
}

export default BurgerBuilder;