import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import Radio from 'react-bootstrap/lib/Radio';

export default class Profile extends React.Component {

  state = {
    user: firebase.auth().currentUser,
    publicUser: {},
  }
  publicUserRef = null;

  componentWillMount() {
    var { user } = this.state;
    this.publicUserRef = firebase.database().ref(`public-users/${user.uid}`);

    this.publicUserRef.once('value', (snap) => {
      this.setState({ publicUser: (snap.val() || {}) });
    });
  }

  setPublicUserValue = (e) => {
    var { publicUser } = this.state;
    publicUser[e.target.name] = e.target.value;
    this.setState({ publicUser });
  }

  savePublicUser = () => {
    var { publicUser } = this.state;
    if(publicUser.publicPlayer === 'true') {
      this.publicUserRef.set(publicUser);
    } else {
      this.publicUserRef.remove();
    }
  }

  buildPublicSettings() {
    var { publicPlayer } = this.state.publicUser;
    return (
      <FormGroup>
        <ControlLabel>Play with other players</ControlLabel>
        <Radio
          name="publicPlayer"
          value={true}
          checked={publicPlayer === 'true'}
          onChange={this.setPublicUserValue}>
          Yes
        </Radio>
        <Radio
          name="publicPlayer"
          value={false}
          checked={publicPlayer!== 'true'}
          onChange={this.setPublicUserValue}>
          No
        </Radio>
      </FormGroup>);
  }

  render() {
    var publicSettings = this.buildPublicSettings();
    var { username } = this.state.publicUser;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Well>
            <h1>Profile</h1>
            <p>
              In order to have a username you need to accept that other players will be able
              to see you username and challenge you to games.
            </p>
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl onChange={this.setPublicUserValue} name="username" value={username}/>
            </FormGroup>
            {publicSettings}
            <Button  bsStyle='success' onClick={this.savePublicUser}>
              Save
            </Button>
          </Well>
        </Col>
      </Row>
      );
  }
}
