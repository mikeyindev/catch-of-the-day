import React from 'react';
import { formatPrice } from '../helpers';
// For animating CSS
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // JSX elements can be assigned to a variable
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if(!fish || fish.status === 'unavailable') {
            // React likes to be able to identify the specific list element, 
            // that's why we provide a key.
            // If the fish is not null, then return its name, otherwise just 
            // return 'fish' 
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available {removeButton}</li>
        }

        return (
            <li key={key}>
                <span>{count}lbs {fish.name}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
                {removeButton}
            </li>
        )
    }

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            // If the fish being added to the order is available, update the 
            // total
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0)
            }
            // Else just return the previous total before the fish is added
            return prevTotal;
        // '0' is the initial value passed to reduce()
        }, 0)
        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <CSSTransitionGroup className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={5000}
                >
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;