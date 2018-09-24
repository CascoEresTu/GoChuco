import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Pago from '../Pago';
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

class Pagos extends Component {
  constructor(props) {
    super(props);
    this.getPagos = this.getPagos.bind(this);
    this.state = {
      spacing: '16',
      pagos: {},
    };
  }

  getPagos() {
    var pagos = [];

    for (let key in this.state.pagos) {
      if (this.state.currentUser.uid === this.state.pagos[key].uid) {
        pagos.push(
          <Pago
            key={key}
            codigo={key}
            clave={this.state.pagos[key].clave}
            monto={this.state.pagos[key].monto}
            telefono={this.state.pagos[key].telefono}
            uid={this.state.pagos[key].uid}
          />
        );
      }
    }

    return pagos;
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Pagos</h2>
            <div className='rows'>
              {this.getPagos()}
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

    // pagos
    this.dbRefPagos = firebase.database().ref('/pagos/');
    this.dbCallbackPagos = this.dbRefPagos.on('value', (snap) => {
      this.setState({ pagos: snap.val() });
    });
  }

  componentWillUnmount() {
    // pagos
    this.dbRefPagos.off('value', this.dbCallbackPagos);
  }
}

Pagos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pagos);