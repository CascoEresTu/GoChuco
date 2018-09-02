import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.author,
      text: props.text,
      uid: props.uid
    };
  }

  render() {
    return (
      <Typography component="p">
        <b>Written by {this.state.author}:</b>
        <br />
        {this.state.text}
        <br />
      </Typography>
    );
  }

  // componentDidMount() {
  //   // comments
  //   this.dbRefComments = firebase.database().ref('/comments/' + this.state.key);
  //   this.dbCallbackComments = this.dbRefComments.on('value', (snap) => {
  //     this.setState(snap.val());
  //   });
  // }

  // componentWillUnmount() {
  //   // comments
  //   this.dbRefUserComments.off('value', this.dbCallbackComments);
  // }
}

export default Comment;