import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Orden from '../Orden';
import firebase from '../../config/constants';
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

class Carretita extends Component {
  constructor(props) {
    super(props);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.getOrdenes = this.getOrdenes.bind(this);

    this.state = {
      spacing: '16',
      requests: {},
    };
  }

  getOrdenes() {
    var ordenes = [];

    for (let key in this.state.requests) {
      if (this.state.currentUser.uid === this.state.requests[key].uid) {
        ordenes.push(
          <Orden
            key={key}
            codigoRequest={key}
            codigoOrden={this.state.requests[key].codigoOrden}
            nombre={this.state.requests[key].nombre}
            descripcion={this.state.requests[key].descripcion}
            restaurante={this.state.requests[key].restaurante}
            nombreRestaurante={this.state.requests[key].nombreRestaurante}
            urlImagen={this.state.requests[key].urlImagen}
            precio={this.state.requests[key].precio}
          />
        );
      }
    }

    return ordenes;
  }

  handleCheckout() {
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Carretita</h2>
            <div className='rows'>
              {this.getOrdenes()}
            </div>
            <Link to="/checkout">
              <Button size="small" color="primary" onClick={this.handleCheckout}>
                Checkout
              </Button>
            </Link>
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
    var user = firebase.auth().currentUser;
    if (user) {
      this.setUser(user);
    }
    // ordenes-requests
    this.dbRefOrdenesRequests = firebase.database().ref('/ordenes-requests');
    this.dbCallbackOrdenesRequests = this.dbRefOrdenesRequests.on('value', (snap) => {
      this.setState({ requests: snap.val() });
    });
  }

  componentWillUnmount() {
    // ordenes-requests
    this.dbRefOrdenesRequests.off('value', this.dbCallbackOrdenesRequests);
  }
}

Carretita.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carretita);