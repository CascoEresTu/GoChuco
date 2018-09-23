import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/Star';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/constants';
import './idk.css';
import Menu from 'Menu'

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
    this.classes = props.classes;
    this.state = {
      codigo: '',
      nombre: '',
      direccion: '',
      ratingPos: '',
      ratingNeg: '',
      urlImagen: '',
      Menu: this.props.Menu
    };
  }

  getActionIcons() {
    return (
      <IconButton key='delete' onClick={this.handleDelete}>
        <StarIcon />
      </IconButton>
    );
  }

  handleAlgo(){
  }

  getActionButtons() {
    return (
      <CardActions>
        <Button size="small" color="primary" onClick={this.handleAlgo}>
          Accion
        </Button>
      </CardActions>
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
            title={'Direccion'}
            subheader={'Codigo #1234'}
          />
        <CardMedia
          className={this.classes.media}
          image="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          title="Foto del restaurante"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {'Nombre del restaurante'}
          </Typography>
          <Typography component="p">
            {'Rating'}
          </Typography>
          <br/>
        </CardContent>
        {this.getActionButtons()}
      </Card>
      </div>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
}

Restaurante.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurante);