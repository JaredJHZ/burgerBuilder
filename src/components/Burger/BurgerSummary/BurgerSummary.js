import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
class BurgerSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderS] will update');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
                                        .map(
                                            (igKey) => 
                                                <li key={igKey}>
                                                     <span style={{textTransform:"capitalize"}}>{igKey}</span>:{this.props.ingredients[igKey]}
                                                </li>
                                        )
       return ( <Aux>
           <h3>Your order summary</h3>
           <p>A delicious burger with the following ingredients</p>
           <ul>
               {ingredientSummary}
           </ul>
           <h2>Total price: <strong>{this.props.cost}</strong>$</h2>
           <Button btnType="Danger" clicked={this.props.cancelHandler}>Cancel</Button>
           <Button btnType="Success" clicked={this.props.continueHandler}>Success</Button>
        </Aux>);   
    
    
}

}
export default BurgerSummary;