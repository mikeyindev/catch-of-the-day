import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };

  render() {
    // This is the same as:
    // const { details: details } = this.props.details;
    // const { index: index } = this.props.index;
    // The "details" in this.props will match "details" in { details }
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    // console.log(details);
    return (
      <li className="menu-fish">
        { /* Same as "this.props.details.name" */ }
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} 
          onClick={() => this.props.addToOrder(this.props.index)}>
          {buttonText}
        </button>
      </li>
    )
  }
}

export default Fish;