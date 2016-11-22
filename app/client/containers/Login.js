import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import { browserHistory } from 'react-router';


export default class Home extends React.Component {

  googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      browserHistory.push('/');
      console.log('sign in', result.credential.accessToken);
    });
  }

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Well>
            <h1>Login</h1>
            <Button onClick={this.googleLogin}>Use google</Button>
          </Well>
        </Col>
      </Row>
      );
  }
}
