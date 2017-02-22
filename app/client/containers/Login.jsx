import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import { login } from 'services/auth-services.jsx';

@connect(s => s)
export default class Login extends React.Component {

  static proptypes = {
    dispatch: React.PropTypes.func
  }

  googleLogin = () => {
    this.props.dispatch(login());;
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
