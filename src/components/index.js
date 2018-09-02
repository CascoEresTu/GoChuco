import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
// import Register from './Register';
import Home from './Home';
import Followed from './protected/Followed';
import MyPosts from './protected/MyPosts';
import Dashboard from './protected/Dashboard';
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
            <Redirect to="/dashboard" />
          )}
    />
  );
}

class App extends Component {
  classes = {}
  constructor(props){
    super(props);
    //const { classes } = this.props;
    this.classes = this.props.classes;
  }

  state = {
    authed: false,
    loading: true
  };
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
          // TODO recargar la pagina cuando haga logout
          // this.setState({});
        }}
        style={{ color: '#fff' }}
      >Logout</Button>
    ) : (
        <span>
          <Link to="/login">
            <Button style={{ color: '#fff' }} >Login</Button>
          </Link>
          {/* <Link to="/register">
            <Button style={{ color: '#fff' }} >Register</Button>
          </Link> */}
        </span>
      );

    const topbarButtons = (
      <div>
        <Link to="/" color="inherit">
          <Button style={{ color: '#fff' }}>Home</Button>
        </Link>
        <Link to="/followed">
          <Button  style={{ color: '#fff' }} >Followed</Button>
        </Link>
        <Link to="/myposts">
          <Button  style={{ color: '#fff' }} >My Posts</Button>
        </Link>
        <Link to="/dashboard">
          <Button  style={{ color: '#fff' }} >Dashboard</Button>
        </Link>
        {authButtons}
      </div>
    );
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
          <div className={this.classes.root}>

            <AppBar position="static"  >
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
                  <Route path="/" exact component={Home} />
                  <PublicRoute
                    authed={this.state.authed}
                    path="/login"
                    component={Login}
                  />
                  {/* <PublicRoute
                    authed={this.state.authed}
                    path="/register"
                    component={Register}
                  /> */}
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/followed"
                    component={Followed}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/myposts"
                    component={MyPosts}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/dashboard"
                    component={Dashboard}
                  />
                  <Route render={() => <h3>No aaaa Match</h3>} />
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