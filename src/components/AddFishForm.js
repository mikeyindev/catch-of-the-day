import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
  constructor(props) {
    super(props);
    this.createFish = this.createFish.bind(this);
  }

  static propTypes = {
    addFish: PropTypes.func
  };

  createFish(event) {
    // Prevents form submission from refreshing the page
    event.preventDefault(); 
    console.log("Gonna make some fish 🐟")

    const fish = {
      name: this.name.value,
      price: parseFloat(this.price.value),
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    // addFish() is passed down from App component through Inventory
    this.props.addFish(fish);
    // Reset the form after form submission to clear entered data
    event.currentTarget.reset();
  }

  render() {
    return (
    <form className="fish-edit" onSubmit={(e) => this.createFish(e)} ref={(input) => this.fishForm = input}>
        { /* Call createFish() on form submit */ }
        <input 
          ref={(input) => this.name = input} 
          type="text" 
          placeholder="Fish Name" 
        />
        <input 
          ref={(input) => this.price = input} 
          type="text" 
          placeholder="Fish Price" />
        <select ref={(input) => this.status = input}> 
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea 
          ref={(input) => this.desc = input} 
          placeholder="Fish Desc"
        />
        <input 
          ref={(input) => this.image = input} 
          type="text" 
          placeholder="Fish Image" 
        />
        <button type="submit">+ Add Item</button>
      </form>
    );
  };
}

export default AddFishForm;