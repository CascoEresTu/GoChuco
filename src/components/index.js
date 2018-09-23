import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Inicio from './Inicio';
import Catalogo from './protected/Catalogo';
import Favoritos from './protected/Favoritos';
import Carretita from './protected/Carretita';
import Checkout from './protected/Checkout';
import Historial from './protected/Historial';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Toolbar, Typography } from '../../node_modules/@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )}
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  console.log('resd: ', { ...rest })
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
            <Redirect to="/" />
          )}
    />
  );
}

class App extends Component {
  classes = {};

  state = {
    authed: false,
    loading: true
  };


  constructor(props){
    super(props);
    this.classes = this.props.classes;
  }

  componentDidMount() {
    // see if user is logged in
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const authButtons = this.state.authed ? (
      <Button
        label="Logout"
        onClick={() => {
          logout();
          this.setState(this.state);
        }}
        style={{ color: '#fff' }}
      >Logout</Button>
    ) : (
        <span>
          <Link to="/login">
            <Button style={{ color: '#fff' }} >Login</Button>
          </Link>
        </span>
      );

    const topbarButtons = (
      <div>
        <Link to="/" color="inherit">
          <Button style={{ color: '#fff' }}>Inicio</Button>
        </Link>
        <Link to="/catalogo">
          <Button style={{ color: '#fff' }}>Catalogo</Button>
        </Link>
        <Link to="/favoritos">
          <Button style={{ color: '#fff' }}>Favoritos</Button>
        </Link>
        <Link to="/carretita">
          <Button style={{ color: '#fff' }} >Carretita</Button>
        </Link>
        <Link to="/historial">
          <Button style={{ color: '#fff' }} >Historial</Button>
        </Link>
        {authButtons}
      </div>
    );
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
          <div className={this.classes.root} style={{ backgroundColor: '#F6BB42' }}>

            <AppBar position="static" style={{ backgroundColor: '#cc0000' }}>
              <Toolbar>
                <IconButton  className={this.classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={this.classes.flex}>
                  GoChuco!
                </Typography>
                  {topbarButtons}
              </Toolbar>
            </AppBar>
            <br/>
            <br/>
            <div className="container-fluid justify-content-center d-flex mt-12">
              <div >
                <Switch>
                  <Route path="/" exact component={Inicio} />
                  <PublicRoute
                    authed={this.state.authed}
                    path="/login"
                    component={Login}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/catalogo"
                    component={Catalogo}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/favoritos"
                    component={Favoritos}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/carretita"
                    component={Carretita}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/checkout"
                    component={Checkout}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/historial"
                    component={Historial}
                  />
                  <Route render={() => <h3>Quejesto</h3>} />
                </Switch>
              </div>
            </div>
          </div>

      );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);