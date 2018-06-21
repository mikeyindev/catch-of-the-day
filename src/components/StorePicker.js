// Has to be imported to every single js file you need the module
import React from 'react'; 
// "../" goes 2 levels up
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  goToStore = (event) => {
    // event.preventDefault();
    console.log('You changed the URL');
    const storeName = this.storeInput.value;
    console.log(`/store/${storeName}`);
    // console.log(this.storeInput.value);
    // console.log(this);
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    // return <p>Hello</p>
    // Needs a parentheses for multi-line HTML. "class" is a reserved word in JS, hence "className"
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        { /* JSX comment. Can't use HTML comment in JSX. DO NOT put comments in the top level as each return can only return 1 parent element */ }
        <h2>Please Enter a Store</h2>
        <input 
          type="text" 
          required placeholder="Store Name" 
          defaultValue={getFunName()} 
          ref={(input) => { this.storeInput = input}} 
        />
        <button type="input">Visit Store</button>
      </form>
    )
  }
}

// Using context to access 'router 'and its methods. Use of context is
// discouraged by React
// StorePicker.contexTypes = {
//     router: React.PropTypes.object
// }

export default StorePicker;