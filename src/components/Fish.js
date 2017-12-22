import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    render() {
        // This is the same as:
        // const { details: details } = this.props.details;
        // const { index: index } = this.props.index;
        // The "details" in this.props will match "details" in { details }
        const { details, index } = this.props;
        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
        // console.log(details);
        return (
            <li className="menu-fish">
                { /* Same as "this.props.details.name" */ }
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} 
                    onClick={() => this.props.addToOrder(index)}>
                    {buttonText}
                </button>
            </li>
        )
    }
}

Fish.propTypes = {
    details: React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired
}

export default Fish;