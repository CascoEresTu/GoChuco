import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../config/constants';
import './idk.css';

class OrdenButton extends Component {
  constructor(props) {
    super(props);
    this.handleRequest = this.handleRequest.bind(this);

    this.state = {
      codigo: props.codigo,
      nombre: props.orden.nombre,
      descripcion: props.orden.descripcion,
      precio: props.orden.precio,
      nombreRestaurante: props.nombreRestaurante,
      restaurante: props.orden.restaurante,
      urlImagen: props.orden.urlImagen,
      currentUser: props.currentUser
    };
  }

  handleRequest() {
    // hacer una nueva orden
    const request = {
      uid: this.state.currentUser.uid,
      nombreRestaurante: this.state.nombreRestaurante,
      restaurante: this.state.restaurante,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      urlImagen: this.state.urlImagen,
      codigoOrden: this.state.codigo,
      precio: this.state.precio
    };

    this.dbRefOrdenesRequests.push(request);
  }

  render() {
    return (
      <Button size="small" color="primary" onClick={this.handleRequest}>
        {this.state.nombre}
      </Button>
    );
  }

  componentDidMount() {
    // ordenes-requests
    this.dbRefOrdenesRequests = firebase.database().ref('/ordenes-requests/');
  }

  componentWillUnmount() {
  }
}

export default OrdenButton;
