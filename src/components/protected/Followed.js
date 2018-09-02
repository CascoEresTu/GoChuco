import firebase from '../../config/constants';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PostCard from '../PostCard';
import '../idk.css';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class Followed extends Component {
  classes = {};

  constructor(props) {
    super(props)
    this.classes = props.classes;
    this.state = {
      currentUser: {},
      posts: {},
      users: {},
      followers: {}
    };
  }

  verifyFollow(post) {
    if (post.privacy === 'private') {
      // post is private
      return false;
    }

    if (!this.state.followers) {
      // there are no followers in the db yet
      return false;
    }

    if (!(post.uid in this.state.followers)) {
      // user doesn't have followers
      return false;
    }

    if (!(this.state.currentUser.uid in this.state.followers[post.uid])) {
      // we are not following him
      return false;
    }

    if (this.state.followers[post.uid][this.state.currentUser.uid] === false) {
      // we stopped following him
      return false;
    }

    // we are following him
    return true;
  }

  sortByDate(arr) {
    return arr.sort((a, b) => {
      let na = a.props.datetime;
      let nb = b.props.datetime;
      if (na < nb) {
        return 1;
      }
      if (na > nb) {
        return -1;
      }
      return 0;
    });
  }

  render() {
    var result = [];
    if (this.state.posts) {
      for (let key in this.state.posts) {
        let post = this.state.posts[key];
        // only show posts by users you're following
        if (this.verifyFollow(post)) {
          result.push(<PostCard
            key={key}
            postid={key}
            uid={post.uid}
            currentUser={this.state.currentUser}
            classes={this.classes}
            datetime={post.serverTime}
          />);
        }
      }
      if (result.length === 0) {
        return (
          <div>There's nothing here yet!</div>
        );
      }
      return (
        <div className='rows'>{this.sortByDate(result)}</div>
      );
    } else {
      return (
        <div>There's nothing here yet!</div>
      );
    }
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
    // posts
    this.dbRefPosts = firebase.database().ref('/posts');
    this.dbCallbackPosts = this.dbRefPosts.on('value', (snap) => {
      this.setState({ posts: snap.val() });
    });

    // users
    this.dbRefUsers = firebase.database().ref('/users');
    this.dbCallbackUsers = this.dbRefUsers.on('value', (snap) => {
      this.setState({ users: snap.val() });
    });

    // followers
    this.dbRefFollowers = firebase.database().ref('/followers');
    this.dbCallbackFollowers = this.dbRefFollowers.on('value', (snap) => {
      this.setState({ followers: snap.val() });
    });

    // other verifications
    var user = firebase.auth().currentUser;
    if (user) {
      this.setUser(user);
    }
  }

  componentWillUnmount() {
    // posts
    this.dbRefPosts.off('value', this.dbCallbackPosts);
    // users
    this.dbRefUsers.off('value', this.dbCallbackUsers);
    // followers
    this.dbRefFollowers.off('value', this.dbCallbackFollowers);
  }
}

Followed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Followed);
