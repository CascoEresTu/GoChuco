import React, { Component } from 'react';
import { login, resetPassword } from '../helpers/auth';
import { firebaseUI, firebaseAuth } from '../config/constants';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function setErrorMsg(error) {
  return {
    loginMessage: error
  };
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginMessage: null
    };
  }

  handleSubmit = e => {
    console.log('submut');
    e.preventDefault();
    login(this.state.email, this.state.password).catch(error => {
      this.setState(setErrorMsg('Invalid username/password.'));
    });
  };
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() =>
        this.setState(
          setErrorMsg(`Password reset email sent to ${this.state.email}.`)
        )
      )
      .catch(error => this.setState(setErrorMsg(`Email address not found.`)));
  };
  render() {
    return (
      <StyledFirebaseAuth uiConfig={firebaseUI} firebaseAuth={firebaseAuth()}/>
          );
  }
}
