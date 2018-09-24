import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import OrdenHistorial from '../OrdenHistorial';
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

class Historial extends Component {
  constructor(props) {
    super(props);
    this.getHistorial = this.getHistorial.bind(this);
    this.state = {
      spacing: '16',
      historial: {},
    };
  }

  getHistorial() {
    var historial = [];

    for (let key in this.state.historial) {
      if (this.state.currentUser.uid === this.state.historial[key].uid) {
        historial.push(
          <OrdenHistorial
            key={key}
            codigoHistorial={key}
            codigoOrden={this.state.historial[key].codigoOrden}
            descripcion={this.state.historial[key].descripcion}
            idCheckout={this.state.historial[key].idCheckout}
            nombre={this.state.historial[key].nombre}
            nombreRestaurante={this.state.historial[key].nombreRestaurante}
            precio={this.state.historial[key].precio}
            restaurante={this.state.historial[key].restaurante}
            urlImagen={this.state.historial[key].urlImagen}
            uid={this.state.currentUser.uid}
          />
        );
      }
    }

    return historial;
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Historial</h2>
            <div className='rows'>
              {this.getHistorial()}
            </div>
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
    this.dbCallbackHistorial = this.dbRefHistorial.on('value', (snap) => {
      this.setState({ historial: snap.val() });
    });
  }

  componentWillUnmount() {
    // historial
    this.dbRefHistorial.off('value', this.dbCallbackHistorial);
  }
}

Historial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Historial);