import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Orden from '../Orden';
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
    this.state = {
      spacing: '16'
    };
  }

  handleCheckout() {
    // TODO: Checkout
    // Toma todas las ordenes del usuario y las guarda al nodo de ordenes
    // en la base de datos
  }

  render() {
    // TODO:
    // Mostrar tarjetas con todas las ordenes del usuario
    // Se pueden eliminar las tarjetas (boton X)
    // Se puede hacer un checkout (boton Checkout)
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Carretita</h2>
            <div className='rows'>
              <Orden/>
              <Orden/>
              <Orden/>
            </div>
            <Button size="small" color="primary" onClick={this.handleCheckout}>
              Hacer Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
}

Carretita.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carretita);