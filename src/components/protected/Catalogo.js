import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Catalogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Typography component="p">
        Catalogo
      </Typography>
    );
  }
}

export default Catalogo;