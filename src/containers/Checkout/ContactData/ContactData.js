import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
//Axios
import {axiosPost} from '../../../Axios';
class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: '',
                validation : {
                    required:true
                },
                valid: false,
                touch:false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your address'
                },
                value: '',
                validation : {
                    required:true
                },
                valid: false,
                touch:false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your country'
                },
                value: '',
                validation : {
                    required:true
                },
                valid: false,
                touch:false
            },
            zipcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your zipcode'
                },
                value: '',
                validation : {
                    required:true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touch:false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid:true
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your email'
                },
                value: '',
                validation : {
                    required:true
                },
                valid: false,
                touch:false
            }
        },
        loading: false,
        formIsValid:false
    }

    validity = (rules, value) => {
        let valid = true;
        if (rules) {
            if (rules.required) {
                valid = value.trim() !== '' && valid;
            }
            if( rules.minLength ) {
                valid = value.trim().length >= rules.minLength && valid;
            }
    
            if( rules.maxLength ) {
                valid = value.trim().length <= rules.maxLength && valid;
            }
        }
        return valid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const cloneOrder = this.state.orderForm;
        let order = {};
        for(let info in cloneOrder) {
            order[info] = cloneOrder[info].value;
        }

        if (this.state.formIsValid) {
            axiosPost.post('',order)
            .then(
                (data) => {
                    this.setState({...this.state, loading:false });
                    this.props.history.push('/');
                    
                }
            ).catch ( (error)=> {
                this.setState({...this.state, loading:false})
            } )
        } 
        
     
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = this.validity(updatedFormElement.validation, updatedFormElement.value);

        updatedFormElement.touch = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});

    }

    render() {
        let inputs = Object.keys(this.state.orderForm)
                        .map(
                            (key) => (
                            <Input key={key} elementype ={this.state.orderForm[key].elementType} 
                                elementconfig={this.state.orderForm[key].elementConfig}
                                changed={(event) => this.inputChangedHandler(event,key)}
                                value={this.state.orderForm[key].value} 
                                shouldValidate = {this.state.orderForm[key].validation }
                                invalid = {!this.state.orderForm[key].valid}
                                touched = {this.state.orderForm[key].touch}
                                />)
                        );
        let form = (<form>
            {inputs}
            <Button disabled={!this.state.formIsValid} clicked={this.orderHandler} btnType="Success" >Order</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
               
            </div>
        );
    }
}


export default ContactData;