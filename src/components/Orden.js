import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/constants';
import './idk.css';

class Orden extends Component {
  classes = {};

  constructor(props) {
    super(props);
    this.getActionIcons = this.getActionIcons.bind(this);
    this.state = {
    };
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
      <div className='row' dateTime={'this.state.datetime.toString()'}>
        <Card className={this.classes.card}>
          <CardHeader
            avatar={
              <Avatar
                alt="Remy Sharp"
                src={this.state.authorPic}
                className={this.classes.avatar}
              />
            }
            action={this.getActionIcons()}
            title={'Nombre del restaurante'}
            subheader={'Codigo de orden #1234'}
          />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {'Nombre de la orden'}
          </Typography>
          <Typography component="p">
            {'Descripcion de la orden'}
          </Typography>
          <br/>
        </CardContent>
      </Card>
      </div>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
}

export default Orden;