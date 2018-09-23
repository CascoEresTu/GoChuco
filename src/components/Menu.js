import firebase from '../config/constants';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from './MenuItem';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class Home extends Component {
  classes = {};

  constructor(props) {
    super(props)
    this.classes = props.classes;
    this.state = {
      currentUser: {},
      MenuItems: {},
      users: {}
    };
  }

  render() {
    var result = [];
    if (this.state.MenuItems) {

      for (let key in this.state.MenuItems) {
        let MenuItem = this.state.MenuItems[key]
        if (MenuItem.privacy == 0) {
          result.push(
            <div>
              <MenuItem
                key={key}
                postid={key}
                currentUser={this.state.currentUser}
                classes={this.classes}
                title={MenuItem.title}
                body={MenuItem.body}
                price={MenuItem.price}
              />
              <br/>

            </div>
          );
        }
      }
      return result;
    } else {
      return (
        <div> No tienes suculencias que ofrecer! D:  </div>
      );
    }

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
    this.setState({
      currentUser: {
        uid: user.uid,
        username: user.displayName
      }
    });
  }

  componentDidMount() {
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

    // other verifications
    var user = firebase.auth().currentUser;
    if (user) {
      this.setUser(user);
    }
  }

  componentWillUnmount() {
    // MenuItems
    this.dbRefMenuItems.off('value', this.dbCallbackMenuItems);
    // users
    this.dbRefUsers.off('value', this.dbCallbackUsers);
  }

  /*
  <Card>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      <TextField
        id = "data"
        hintText="Hint Text"
        floatingLabelText="Floating Label Text"
      />
    </CardText>
    <CardActions>
      <RaisedButton label="Action1" />
      <RaisedButton label="Action2" primary={true} onClick={() => { this.prueba(); }}/>
    </CardActions>
  </Card>
  */
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);