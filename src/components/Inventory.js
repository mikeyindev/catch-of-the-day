import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        // Default uid and owner are null
        this.state = {
            uid: null,
            owner: null
        }
    }

    // Every time we reload the page, it'll run authHandler() again which will do all the checking and set all the state without requiring the user to login again
    componentDidMount() {
        base.onAuth((user) => {
            if(user) {
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
        }
        this.props.updateFish(key, updatedFish);
    }

    // Render login buttons for Facebook, Twitter
    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
            </nav>
        )
    }

    authenticate(provider) {
        console.log(`Trying to log in with ${provider}`);
            let authProvider;
        switch (provider) {
            case 'github': 
                authProvider = new base.auth.GithubAuthProvider();
                break;
            case 'facebook':
                authProvider = new base.auth.FacebookAuthProvider();
                break;
            case 'twitter':
                authProvider = new base.auth.TwitterAuthProvider();
                break;
        }

        base.auth().signInWithPopup(authProvider).then(
            (res) => { this.authHandler(res); },
            (err) => { console.log(err); }
        );
    }

    authHandler(res) {
        console.log(res);    
        // Grab store info
        const storeRef = base.database().ref(this.props.storeId);

        // Query Firebase once for store data
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            
            // If the store doesn't have an owner, i.e. it's newly created, set the user logging in as owner. This only updates the owner on Firebase, not the client application
            if(!data.owner) {
                storeRef.set({
                    owner: res.user.uid
                });
            }
            // This sets the owner in the client application's state
            this.setState({
                uid: res.user.uid,
                owner: data.owner || res.user.uid
            });
        });
    }

    logout() {
        base.unauth();
        this.setState({ uid: null });
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
                <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        const logout = <button onClick={ this.logout }>Log Out!</button>;
        // Check if the user is logged i.n If not, render the login buttons. We're storing uid in state
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you aren't the owner of this store</p>
                    {logout}
                </div>
            )
        }

        return(
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                { /* Because addFish() is added to the props of Inventory. To call it, we need to access Inventory's props */ }
                <AddFishForm addFish={this.props.addFish} />
                { /* We do the same here as loadSamples is added to Inventory's props */ }
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired, 
    updateFish: React.PropTypes.func.isRequired, 
    removeFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
}

export default Inventory;