import React, { Component } from 'react';
import { auth } from '../helpers/auth';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function setErrorMsg(error) {
  return {
    registerError: error.message
  };
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerError: null,
      email: '',
      password: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    auth(this.state.email, this.state.password).catch(e =>
      this.setState(setErrorMsg(e))
    );
  };

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={style.container}>
        <h3>Register</h3>
        <TextField
          hinttext="Enter your Email"
          floatinglabeltext="Email"
          onChange={(event) => this.setState({ email: event.target.value })}
        />
        <br />
        <TextField
          type="password"
          hinttext="Enter your Password"
          floatinglabeltext="Password"
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
        <Button
          // primary={true}
          // style={style.raisedBtn}
          type="submit"
        >Register</ Button>
      </form>
    );
  }
}

const raisedBtn = {
  margin: 15
};

const container = {
  textAlign: 'center'
};

const style = {
  raisedBtn,
  container
};
