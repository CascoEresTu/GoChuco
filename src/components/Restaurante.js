import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, IconButton } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/Star';
import firebase from './../config/constants';
import './idk.css';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Restaurante extends Component {
  constructor(props) {
    super(props);
    this.getActionIcons = this.getActionIcons.bind(this);
    this.getActionButtons = this.getActionButtons.bind(this);
    this.getRating = this.getRating.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.classes = props.classes;

    this.state = {
      codigo: props.codigo,
      nombre: props.nombre,
      direccion: props.direccion,
      rating: props.rating,
      urlImagen: props.urlImagen,
      favoritos: {} // people that have this on favorite
    };
  }

  getActionIcons() {
    return (
      <IconButton key='star' onClick={this.handleFavorite}>
        <StarIcon />
      </IconButton>
    );
  }

  handleFavorite(event) {
    var favority = {};

    if (!this.state.favoritos) {
      // there are no favorites yet so we create a new node
      favority[this.state.currentUser.uid] = true;
    } else if (!(this.state.currentUser.uid in this.state.favoritos)) {
      // there are favorites but the user isnt' following
      favority = this.state.favoritos;
      favority[this.state.currentUser.uid] = true;
    } else {
      // there are favorites and the user has followed, invert result
      favority = this.state.favoritos;
      favority[this.state.currentUser.uid] = !this.state.favoritos[this.state.currentUser.uid];
    }
    // update db and state
    this.dbRefFavoritos.update(favority);
    this.setState({ favoritos: favority });
  }

  handleAlgo(){
  }

  getActionButtons() {
    return (
      <CardActions>
        <Button size="small" color="primary" onClick={this.handleAlgo}>
          Orden #1
        </Button>
        <Button size="small" color="primary" onClick={this.handleAlgo}>
          Orden #2
        </Button>
      </CardActions>
    );
  }

  getRating() {
    const pos = this.state.rating.positivas;
    const neg = this.state.rating.negativas;

    return (
      <Typography component="p">
        {`Rating positivos: ${pos}`}
        <br/>
        {`Rating negativos: ${neg}`}
      </Typography>
    );
  }

  render() {
    return (
      <div className='row'>
        <Card className={this.classes.card}>
          <CardHeader
            action={this.getActionIcons()}
            title={this.state.direccion}
            subheader={'Codigo ' + this.state.codigo}
          />
        <CardMedia
          className={this.classes.media}
          image={this.state.urlImagen}
          title={this.state.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.state.nombre}
          </Typography>
          {this.getRating()}
          <br/>
        </CardContent>
        {this.getActionButtons()}
      </Card>
      </div>
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
    this.dbRefRestaurantes = firebase.database().ref('/restaurantes/');
    this.dbCallbackRestaurantes = this.dbRefRestaurantes.on('value', (snap) => {
      this.setState({ restaurantes: snap.val() });
    });

    // favorites
    this.dbRefFavoritos = firebase.database().ref('/favoritos/' + this.state.codigo);
    this.dbCallbackFavoritos = this.dbRefFavoritos.on('value', (snap) => {
      this.setState({ favoritos: snap.val() });
    });
  }

  componentWillUnmount() {
    // restaurantes
    this.dbRefRestaurantes.off('value', this.dbCallbackRestaurantes);

    // favoritos
    this.dbRefFavoritos.off('value', this.dbCallbackFavoritos);
  }
}

Restaurante.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurante);