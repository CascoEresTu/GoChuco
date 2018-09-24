import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import firebase from '../config/constants';
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

class OrdenHistorial extends Component {
  constructor(props) {
    super(props);
    this.getActionIcons = this.getActionIcons.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.recomendar = this.recomendar.bind(this);
    this.noRecomendar = this.noRecomendar.bind(this);
    this.classes = props.classes;

    this.state = {
      codigoHistorial: props.codigoHistorial,
      idCheckout: props.idCheckout,
      codigoOrden: props.codigoOrden,
      nombre: props.nombre,
      descripcion: props.descripcion,
      restaurante: props.restaurante,
      nombreRestaurante: props.nombreRestaurante,
      urlImagen: props.urlImagen,
      precio: props.precio,
      uid: props.uid,
      ratings: {}
    };
  }

  handleDelete() {
    this.dbRefHistorial.remove();
  }

  getActionIcons() {
    return (
      <IconButton key='delete' onClick={this.handleDelete}>
        <DeleteIcon />
      </IconButton>
    );
  }

  recomendar() {
    // initial value
    var newRatings = this.state.ratings;

    //flip on the user
    newRatings.positivas[this.state.uid] = true;
    newRatings.negativas[this.state.uid] = false;

    // update db and state
    this.dbRefRatings.update(newRatings);
    this.setState({ ratings: newRatings });
  }

  noRecomendar() {
    // initial value
    var newRatings = this.state.ratings;

    //flip on the user
    newRatings.positivas[this.state.uid] = false;
    newRatings.negativas[this.state.uid] = true;

    // update db and state
    this.dbRefRatings.update(newRatings);
    this.setState({ ratings: newRatings });
  }

  render() {
    return (
      <div className='row'>
        <Card className={this.classes.card}>
          <CardHeader
            action={this.getActionIcons()}
            title={this.state.nombreRestaurante}
            subheader={'Codigo de checkout ' + this.state.idCheckout}
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
            <Typography component="p">
              {this.state.descripcion}
              <br/>
              <br/>
              <br/>
              {`Precio: Lps. ${this.state.precio}`}
            </Typography>
            <br/>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={this.recomendar}>
              Recomendar
            </Button>
            <Button size="small" color="primary" onClick={this.noRecomendar}>
              No recomendar
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    // historial
    this.dbRefHistorial = firebase.database().ref('/historial/' + this.state.codigoHistorial);

    // ratings
    this.dbRefRatings = firebase.database().ref(`/restaurantes/${this.state.restaurante}/rating/`);
    this.dbCallbackRatings = this.dbRefRatings.on('value', (snap) => {
      this.setState({ ratings: snap.val() });
    });
  }

  componentWillUnmount() {
    // ratings
    this.dbRefRatings.off('value', this.dbCallbackRatings);
  }
}

OrdenHistorial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdenHistorial);