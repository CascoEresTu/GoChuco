import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

class NuevaOrden extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      spacing: '16',
      registerError: null,
      restaurantes: {},
      restaurante: '',
      descripcion: '',
      urlImagen: '',
      nombre: '',
      precio: 0,
    };
  }

  generarSelect() {
    var items = [];

    for (let key in this.state.restaurantes) {
      if (this.state.currentUser.uid === this.state.restaurantes[key].owner) {
        items.push(
          <MenuItem value={key}>
            {this.state.restaurantes[key].nombre}
          </MenuItem>
        );
      }
    }
    return (
      <Select
        value={this.state.restaurante}
        onChange={(event) => this.setState({ restaurante: event.target.value })}
        name='restaurante'
        inputProps={{
          id: 'restaurante-required',
        }}
      >
        <MenuItem value=''><em></em></MenuItem>
        {items}
      </Select>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      descripcion: this.state.descripcion,
      restaurante: this.state.restaurante,
      urlImagen: this.state.urlImagen,
      nombre: this.state.nombre,
      precio: this.state.precio,
    };

    this.dbRefOrdenes.push(newOrder);

    this.setState({
      restaurante: '',
      descripcion: '',
      urlImagen: '',
      nombre: '',
      precio: 0,
    });
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Nueva orden</h2>
            <form onSubmit={this.handleSubmit}>
              <br/>
              <b>Nombre:</b>
              <br/>
              <TextField
                value={this.state.nombre}
                onChange={(event) => this.setState({ nombre: event.target.value })}
              />
              <br/>
              <br/>
              <b>Descripcion:</b>
              <br/>
              <TextField
                value={this.state.descripcion}
                onChange={(event) => this.setState({ descripcion: event.target.value })}
              />
              <br/>
              <br/>
              <b>Precio (Lps.):</b>
              <br/>
              <TextField
                type='number'
                value={this.state.precio}
                onChange={(event) => this.setState({ precio: event.target.value })}
              />
              <br/>
              <br/>
              {this.generarSelect()}
              <br/>
              <br/>
              <b>URL de Imagen:</b>
              <br/>
              <TextField
                value={this.state.urlImagen}
                onChange={(event) => this.setState({ urlImagen: event.target.value })}
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
    var user = firebase.auth().currentUser;
    if (user) {
      this.setUser(user);
    }

    // restaurantes
    this.dbRefRestaurantes = firebase.database().ref('/restaurantes');
    this.dbCallbackRestaurantes = this.dbRefRestaurantes.on('value', (snap) => {
      this.setState({ restaurantes: snap.val() });
    });

    // ordenes
    this.dbRefOrdenes = firebase.database().ref('/ordenes');
  }

  componentWillUnmount() {
    // restaurantes
    this.dbRefRestaurantes.off('value', this.dbCallbackRestaurantes);
  }
}

NuevaOrden.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NuevaOrden);