import React from 'react'; // Has to be imported to every single js file you need the module
import { getFunName } from '../helpers'; // "../" goes 2 levels up

class StorePicker extends React.Component {
    // constructor() {
    //     super(); // Calls React.Component's constructor
    //     // Binds goToStore() to the component. This isn't required for render() because it's in every component.
    //     this.goToStore = this.goToStore.bind(this);
    // }

    goToStore(event) {
        // event.preventDefault();
        console.log('You changed the URL');
        const storeId = this.storeInput.value;
        console.log(`/store/${storeId}`);
        // console.log(this.storeInput.value);
        // console.log(this);
        this.props.history.push(`/store/${storeId}`);
    }

    render() {
        // return <p>Hello</p>
        // Needs a parentheses for multi-line HTML. "class" is a reserved word in JS, hence "className"
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                { /* JSX comment. Can't use HTML comment in JSX. DO NOT put comments in the top level as each return can only return 1 parent element */ }
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
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