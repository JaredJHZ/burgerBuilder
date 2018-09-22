import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {
            controls.map(ctrl =>
                {
                    let disabled = true; 
                    disabled = props.disabled(ctrl.type);
                    let isEnough = props.enough(ctrl.type);
                        return (<BuildControl 
                                key={ctrl.label} 
                                label={ctrl.label}
                                added={() => props.ingredientAdded(ctrl.type)}
                                delete = {props.deleteIngredient.bind(this, ctrl.type)}
                                disabled = { disabled}
                                tooMuch = {isEnough}
                                />
                        )
                }
         )
        }
                <button
                onClick={props.ordered}
                disabled={props.orderD}
                className={classes.OrderButton}>Order</button>
    </div>
);

export default buildControls;