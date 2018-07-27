import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
// For animating CSS
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.renderOrder = this.renderOrder.bind(this);
  }

  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  };

  renderOrder = (key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      const transitionOptions = {
        classNames: "order",
        key,
        timeout: { enter: 500, exit: 500 }
      };

      // JSX elements can be assigned to a variable
      const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

      if(!isAvailable) {
          // React likes to be able to identify the specific list element, 
          // that's why we provide a key.
          // If the fish is not null, then return its name, otherwise just 
          // return 'fish' 
          return (
            <CSSTransition {...transitionOptions}>
              <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available {removeButton}
              </li>
            </CSSTransition>
          );
      }

      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={500}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}
              {formatPrice(count * fish.price)}
              <button onClick={() => this.props.removeFromOrder(key)}>
                &times; {/*The 'x' symbol*/}
              </button>
            </span>
          </li>
        </CSSTransition>
      );
  };

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
      }, 0);

      return(
          <div className="order-wrap">
              <h2>Your Order</h2>
              <TransitionGroup
                component="ul"
                className="order"
              >
                {orderIds.map(this.renderOrder)}
              </TransitionGroup>
              <div className="total">
                Total:
                <strong>{formatPrice(total)}</strong>
              </div>
          </div>
      )
  }
}

export default Order;