import React, {Component} from 'react';
import Order from '../../../components/Order/Order';
import {axiosRequestOrders} from '../../../Axios';
import withErrorHandler from '../../../hoc/withErrorHandler';
class Orders extends Component {

    state = {
        orders:[],
        loading: true
    }

    componentDidMount() {
        axiosRequestOrders.get('')
            .then(
                (data) => {
                    const fetchedOrders = [];
                    for (let key in data.data) {
                        fetchedOrders.push(
                            { ...data.data[key] , id: key}
                        );
                    }
                    this.setState({loading:false, orders: fetchedOrders});
                }
            ).catch(
                err => this.setState({loading:false})
            )
    }

    render() {

        return (
            <div>
               {this.state.orders.map(
                   (order) => <Order ingredients={order.ingredients} price={order.price} key={order.id} />
               )}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosRequestOrders);