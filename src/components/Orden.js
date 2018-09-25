import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import firebase from '../config/constants';
import './idk.css';
import Map from './Map'
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Orden extends Component {
  constructor(props) {
    super(props);
    this.getActionIcons = this.getActionIcons.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.classes = props.classes;

    this.state = {
      codigoRequest: props.codigoRequest,
      codigoOrden: props.codigoOrden,
      nombre: props.nombre,
      descripcion: props.descripcion,
      restaurante: props.restaurante,
      nombreRestaurante: props.nombreRestaurante,
      urlImagen: props.urlImagen,
      precio: props.precio
    };
  }

  handleDelete() {
    this.dbRefOrdenesRequests.remove();
  }

  getActionIcons() {
    return (
      <IconButton key='delete' onClick={this.handleDelete}>
        <DeleteIcon />
      </IconButton>
    );
  }

  render() {
    return (
      <div className='row'>
        <Card className={this.classes.card}>
          <CardHeader
            action={this.getActionIcons()}
            title={this.state.nombreRestaurante}
            subheader={'Codigo ' + this.state.codigoRequest}
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
        </Card>
      </div>
    );
  }

  componentDidMount() {
    // ordenes-requests
    this.dbRefOrdenesRequests = firebase.database().ref('/ordenes-requests/' + this.state.codigoRequest);
  }

  componentWillUnmount() {
  }
}

Orden.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Orden);