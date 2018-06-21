import React from 'react'; // Has to be imported to every single js file you need the module
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
  state = {
    // fishes is an object containing many fish objects
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object
  };

  // One of React's component lifecycle hooks. Used to store state on 
  // Firebase right before component is mounted, i.e. before render() is 
  // called.
  componentDidMount() {
  const { params } = this.props.match;
    // We're only persisting the 'fishes' state, not 'order'. 'order' is 
    // stored in localstorage. Because the storeId is generated dynamically,
    // We reference the :storeId param from the URL
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // In case there's already an order saved in localStorage, retrieve it.
    const localStorageRef = localStorage.getItem(params.storeId);
    // if localStorageRef is not null, update the App's order state
    if (localStorageRef) {
      this.setState({
        // Order is stored as JSON in localStorage
        order: JSON.parse(localStorageRef)
      });
    }
  }

  // Store order in localstorage on the browser
  componentDidUpdate(nextProps, nextState) {
    console.log("Something changed");
    console.log({ nextProps, nextState })
    // Turn the order nextState.order object into a JSON string because 
    // local storage can only store a string value
    localStorage.setItem(this.props.match.params.storeId, 
      JSON.stringify(nextState.order));
  }

  // When component is unmounted/removed from DOM, remove the Firebase listener
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(fish) {
    // this.state.fishes.fish1 = fish;
    
    // Using spread operator to clone the state. Copying the state before
    // updating it
    const fishes = {...this.state.fishes};
    // Assign timestamp
    fishes[`fish${Date.now()}`] = fish;
    // We're only updating the fishes state. Assigning the updated fishes 
    // object to the "fishes" property in "state". Can also just do this:
    // this.setState({ fishes });
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes}
    // Can't do: delete fishes[key]; because it doesn't work with Firebase
    fishes[key] = null;
    this.setState({ fishes });
  }

  addToOrder(key) {
    // Take a deep copy of the state using spread operator
    const order = {...this.state.order};
    // If there's already an order, add 1 to it; if not, then the quantity is just '1'
    order[key] = order[key] + 1 || 1;
    this.setState({ order: order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  loadSamples() {
    this.setState({ fishes: sampleFishes });
}

  render() {
    // return <p>Hello</p>
    // Needs a parentheses for multi-line HTML. "class" is a reserved word in JS, hence "className"
    return (
      <div className="cornucopia-of-the-sea">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            { /* Object.keys() returns an array of keys in the fishes state object, then we use map() to iterate over the array. This is because the fishes object is not an array & can't be iterated over directly */ }
            {Object.keys(this.state.fishes)
              // We're passing down the same value twice because 
              // "key" is used by React and isn't available in 
              // props "index" is our self-defined prop that we 
              // can use
              .map(key => 
                <Fish key={key} 
                  index={key} 
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder} 
                />)}
          </ul>
        </div>
        { /* Passing the state down to Order component and the "storeId" params because App has access to params but not Order */ }
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          params={this.props.match.params} 
          removeFromOrder={this.removeFromOrder} />
        { /* Pssing addFish() down to Inventory because AddFishForm is used inside the Inventory component */ }
        <Inventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes} 
          updateFish={this.updateFish} 
          removeFish={this.removeFish} 
          storeId={this.props.match.params.storeId} 
        />
      </div>
    )
  }
}

export default App;