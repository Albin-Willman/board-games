import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import {
  connectToProfile,
  disconnectFromProfile,
  updateProfile,
  removeProfile,
} from 'services/profile-services.jsx';

import Radio from 'react-bootstrap/lib/Radio';

@connect(s => {
  return { profile: s.profile.profile };
})
export default class Profile extends React.Component {

  static propTypes = {
    profile: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(connectToProfile());
  }

  componentWillUnmount() {
    var { dispatch } = this.props;
    dispatch(disconnectFromProfile());
  }

  setPublicUserValue = (e) => {
    var { profile, dispatch } = this.props;
    var { name, value } = e.target;
    if(name === 'publicPlayer' && value === false) {
      dispatch(removeProfile);
      return;
    }
    var newProfile = { ...profile };
    newProfile[name] = value;
    dispatch(updateProfile(newProfile));
  }

  buildPublicSettings() {
    var { publicPlayer } = this.props.profile;
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
          checked={publicPlayer !== 'true'}
          onChange={this.setPublicUserValue}>
          No
        </Radio>
      </FormGroup>);
  }

  buildUsernameSection() {
    var { publicPlayer, username } = this.props.profile;
    if(publicPlayer !== 'true') {
      return false;
    }
    return (
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl onChange={this.setPublicUserValue} name="username" value={username}/>
      </FormGroup>
      );
  }

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Well>
            <h1>Profile</h1>
            <p>
              In order to have a username you need to accept that other players will be able
              to see you username and challenge you to games.
            </p>
            {this.buildPublicSettings()}
            {this.buildUsernameSection()}
          </Well>
        </Col>
      </Row>
      );
  }
}
