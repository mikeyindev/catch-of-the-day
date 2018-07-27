import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';
import firebase from 'firebase';
import Login from './Login';
import PropTypes from 'prop-types';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      owner: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    removeFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSamples: PropTypes.func,
    storeId: PropTypes.string
  };

  // Every time we reload the page, it'll run authHandler() again which will do
  // all the checking and set all the state without requiring the user to login
  // again
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  // Triggered by onChange
  handleChange(e, key) {
    const fish = this.props.fishes[key];
    console.log(e.target.name, e.target.value);
    // We're using "computed properties" to update whatever's being changed
    // rather than specifying using if-statements.
    const updatedFish = {
      ...fish, // Unpacking all the properties of fish
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  // authHandler(res) {
  //   console.log(res);
  //   // Grab store info
  //   const storeRef = base.database().ref(this.props.storeId);

  //   // Query Firebase once for store data
  //   storeRef.once('value', (snapshot) => {
  //     const data = snapshot.val() || {};

  //     // If the store doesn't have an owner, i.e. it's newly created, set the user logging in as owner. This only updates the owner on Firebase, not the client application
  //     if (!data.owner) {
  //       storeRef.set({
  //         owner: res.user.uid
  //       });
  //     }
  //     // This sets the owner in the client application's state
  //     this.setState({
  //       uid: res.user.uid,
  //       owner: data.owner || res.user.uid
  //     });
  //   });
  // }

  authHandler = (authData) => {
    // Look up current store in Firebase
    const store = base.fetch(this.props.storeId, { context: this });
    console.log(store);

    if (!store.owner) {
      base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    // Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = (provider) => {
    console.log(`Trying to log in with ${provider}`);
    // let authProvider = new firebase.auth[`${provider}AuthProvider`]()
    let authProvider;
    switch (provider) {
      case 'github':
        // To set up Github OAuth, visit
        // https://github.com/settings/applications/new
        authProvider = new firebase.auth.GithubAuthProvider();
        break;
      case 'facebook':
        // To set up Facebook OAuth, visit https://developers.facebook.com/, click 'My Apps'
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        // To set up Twitter OAuth, visit https://apps.twitter.com/
        authProvider = new firebase.auth.TwitterAuthProvider();
        break;
      default:
        return;
    }
    console.log(authProvider);
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = () => {
    console.log('Logging out');
    firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // Check if the user is logged i.n If not, render the login buttons. We're
    // storing uid in state
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // Check it the user is the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store</p>
          {logout}
        </div>
      );
    }

    // If the user is the owner, render the inventory
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
          />
        ))}
        {/* Because addFish() is added to the props of Inventory. To call it, we need to access Inventory's props */}
        <AddFishForm addFish={this.props.addFish} />
        {/* We do the same here as loadSamples is added to Inventory's props */}
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;