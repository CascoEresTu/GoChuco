import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
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

class Pago extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      codigo: props.codigo,
      clave: props.clave,
      monto: props.monto,
      telefono: props.telefono,
      uid: props.uid,
      pagos: {},
    };
  }

  render() {
    return (
      <div className='row'>
        <Card className={this.classes.card}>
          <CardHeader
            subheader={'Codigo de checkout' + this.state.codigo}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {`Telefono utilizado para el pago: ${this.state.telefono}`}
            </Typography>
            <Typography component="p">
              <br/>
              <br/>
              <br/>
              {`Monto de pago: Lps. ${this.state.monto}`}
            </Typography>
            <br/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Pago.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pago);