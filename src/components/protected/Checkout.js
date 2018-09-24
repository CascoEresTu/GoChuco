import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateRequests = this.updateRequests.bind(this);

    this.state = {
      spacing: '16',
      registerError: null,
      phoneNumber: '',
      password: '',
      monto: 0.0,
      requests: {},
      myRequests: {},
    };
  }

  updateRequests() {
    var result = {};
    var montoTotal = 0;

    for (let key in this.state.requests) {
      if (this.state.currentUser.uid === this.state.requests[key].uid) {
        result[key] = this.state.requests[key];
        montoTotal += parseInt(result[key].precio, 10);
      }
    }

    this.setState({
      monto: montoTotal,
      myRequests: result
    });
  }

  guardarHistorial(key) {
    // mover todos posts de /ordenes-requests/ a /historial/
    let ordenHistorial;

    for (let i in this.state.myRequests) {
      ordenHistorial = this.state.myRequests[i];
      ordenHistorial.idCheckout = key;
      firebase.database().ref('/historial/' + i).set(ordenHistorial);
      firebase.database().ref('/ordenes-requests/' + i).remove();
    }

    this.setState({
      phoneNumber: '',
      password: '',
      monto: 0.0,
      myRequests: {},
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const checkout = {
      telefono: this.state.phoneNumber,
      clave: this.state.password,
      monto: this.state.monto,
      uid: this.state.currentUser.uid,
    };

    this.dbRefPagos.push(checkout).then((snap) => {
      this.guardarHistorial(snap.key);
    });
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Checkout</h2>
            <form onSubmit={this.handleSubmit}>
              <b>Monto total:</b> Lps. {this.state.monto}
              <br/>
              <br/>
              <b>Num. telefono:</b>
              <br/>
              <TextField
                value={this.state.phoneNumber}
                onChange={(event) => this.setState({ phoneNumber: event.target.value })}
              />
              <br/>
              <br/>
              <b>Llave secreta:</b>
              <br/>
              <TextField
                type="password"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
              />
              <br/>
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
    var user = firebase.auth().currentUser;
    if (user) {
      this.setUser(user);
    }

    // historial
    this.dbRefHistorial = firebase.database().ref('/historial/');

    // pagos
    this.dbRefPagos = firebase.database().ref('/pagos/');

    // ordenes-requests
    this.dbRefOrdenesRequests = firebase.database().ref('/ordenes-requests/');
    this.dbCallbackOrdenesRequests = this.dbRefOrdenesRequests.on('value', (snap) => {
      this.setState({ requests: snap.val() });
      this.updateRequests();
    });
  }

  componentWillUnmount() {
    // ordenes-requests
    this.dbRefOrdenesRequests.off('value', this.dbCallbackOrdenesRequests);
  }

}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);