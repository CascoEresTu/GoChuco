import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Restaurante from '../Restaurante';
import firebase from '../../config/constants';

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

class Catalogo extends Component {
  constructor(props) {
    super(props);
    this.getRestaurantes = this.getRestaurantes.bind(this);
    this.state = {
      spacing: '16',
      restaurantes: {},
    };
  }

  getRestaurantes() {
    var resultado = [];

    for (let key in this.state.restaurantes) {
      resultado.push(
        <Restaurante
          key={key}
          codigo={key}
          nombre={this.state.restaurantes[key].nombre}
          direccion={this.state.restaurantes[key].direccion}
          rating={this.state.restaurantes[key].rating}
          urlImagen={this.state.restaurantes[key].urlImagen}
        />
      );
    }

    return resultado;
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Catalogo</h2>
            <div className='rows'>
              {this.getRestaurantes()}
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

    // restaurantes
    this.dbRefRestaurantes = firebase.database().ref('/restaurantes');
    this.dbCallbackRestaurantes = this.dbRefRestaurantes.on('value', (snap) => {
      this.setState({ restaurantes: snap.val() });
    });
  }

  componentWillUnmount() {
    // restaurantes
    this.dbRefRestaurantes.off('value', this.dbCallbackRestaurantes);
  }
}

Catalogo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Catalogo);