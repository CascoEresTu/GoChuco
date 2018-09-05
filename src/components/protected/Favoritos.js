import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Restaurante from '../Restaurante';
import Typography from '@material-ui/core/Typography';

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

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: '16'
    };
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item>
          <Paper className={classes.control}>
            <h2>Favoritos</h2>
            <div className='rows'>
              <Restaurante/>
              <Restaurante/>
              <Restaurante/>
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

Favoritos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Favoritos);