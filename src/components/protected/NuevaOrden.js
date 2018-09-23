import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../../config/constants';
import Select from '@material-ui/core/Select';
import Dropdown from '@material-ui/core/Dropdown';
import DropdownItem from '@material-ui/core/DropdownItem';
import '../idk.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class NuevaOrden extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      spacing: '16',
      registerError: null,
      phoneNumber: '',
      password: '',
      Restaurants: {},
      MenuItems:{}, 
      monto: 0.0
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      phoneNumber: '',
      password: '',
      monto: 0.0
    });
  }

  renderComboBoxRestaurants(){

      var selectedRestaurant = this.state.D
      return (
        
        <Dropdown color="primary" label="Dropdown">
          <DropdownItem link="#/link1">Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
          <DropdownItem>Option 4</DropdownItem>
        </Dropdown>
      );

    
  }

  renderComboBoxMenuItems(){
    
      return (
        <Dropdown color="primary" label="Dropdown">
          <DropdownItem link="#/link1">Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
          <DropdownItem>Option 4</DropdownItem>
        </Dropdown>
      );

  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    var slctdRestaurant;
    var getRestaurants = []
    
    if (this.state.Restaurants) {
      for(let key in this.state.Restaurants)
      let Restaurant = this.state.Restaurants[key]
      var RestName = Restaurant.nombre;  
      getRestaurants.push(

        <DropdownItem> RestName </DropdownItem>
      )
    }

    var slctdItem; 

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>

            <Dropdown color="primary" label="Dropdown">
              {getRestaurants} 
            </Dropdown>        
            
            <h2>Orden</h2>
            <form onSubmit={this.handleSubmit}>
              <Select></Select>
              
              <TextField
                value={this.state.phoneNumber}
                onChange={(event) => this.setState({ phoneNumber: event.target.value })}
              />
              
              <TextField
                value={this.state.phoneNumber}
                onChange={(event) => this.setState({ phoneNumber: event.target.value })}
              />

               <TextField
                value={this.state.phoneNumber}
                onChange={(event) => this.setState({ phoneNumber: event.target.value })}
              />
              
              <br />
              <br />
              <b>Otro:</b>
              <br/>
              <TextField
                type="password"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
              />
              <br />
              {this.state.registerError && (
                <div className="alert alert-danger" role="alert">
                  <span
                    className="glyphicon glyphicon-exclamation-sign"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Error:</span>
                  &nbsp;{this.state.registerError}
                </div>
              )}
              <br/>
              <Button type="submit">Confirmar</ Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  setUser(user) {
    // if user not in db: add him
    firebase.database().ref('/users/' + user.uid).on('value', (snap) => {
      if (!snap.val()) {
        firebase.database().ref('/users/' + user.uid).set({
          email: user.email,
          profile_picture: user.photoURL,
          username: user.displayName
        });
      }
    });

    // add user info to state
    this.setState({ currentUser: {
      uid: user.uid,
      email: user.email,
      profile_picture: user.photoURL,
      username: user.displayName
    } });
  }

  componentDidMount() {
  // Restaurants
    this.dbRefRestaurants = firebase.database().ref('/Restaurants');
    this.dbCallbackRestaurants = this.dbRefRestaurants.on('value', (snap) => {
    this.setState({ Restaurants: snap.val() });
    });
    //Menu
    this.dbRefMenu = firebase.database().ref('/Menu');
    this.dbCallbackMenu = this.dbRefMenu.on('value', (snap) => {
      this.setState({ Menu: snap.val() });
    });

    // MenuItems
    this.dbRefMenuItems = firebase.database().ref('/MenuItems');
    this.dbCallbackMenuItems = this.dbRefMenuItems.on('value', (snap) => {
      this.setState({ MenuItems: snap.val() });
    });


// users
    this.dbRefUsers = firebase.database().ref('/users');
    this.dbCallbackUsers = this.dbRefUsers.on('value', (snap) => {
    this.setState({ users: snap.val() });
    });


    var user = firebase.auth().currentUser;
    if (user) {
      this.setUser(user);
    }
  }
}

NuevaOrden.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NuevaOrden);