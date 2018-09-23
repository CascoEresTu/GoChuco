import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

    this.state = {
      spacing: '16',
      registerError: null,
      email: '',
      password: ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
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
              <b>Algo:</b>
              <br/>
              <TextField
                hinttext="Algo"
                floatinglabeltext="Algo"
                onChange={(event) => this.setState({ email: event.target.value })}
              />
              <br />
              <br />
              <b>Otro:</b>
              <br/>
              <TextField
                type="password"
                hinttext="Otro"
                floatinglabeltext="Otro"
                onChange={(event) => this.setState({ password: event.target.value })}
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
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);