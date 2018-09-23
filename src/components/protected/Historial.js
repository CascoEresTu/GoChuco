import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

class Historial extends Component {
  constructor(props) {
    super(props);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.state = {
      spacing: '16'
    };
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
            <h2>Historial</h2>
            <div className='rows'>
              <Orden/>
              <Orden/>
              <Orden/>
            </div>
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

Historial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Historial);