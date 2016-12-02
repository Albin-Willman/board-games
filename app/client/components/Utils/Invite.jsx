import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

export default class NewGame extends React.Component {
  static propTypes = {
    invite: React.PropTypes.object,
    acceptGame: React.PropTypes.func,
    rejectGame: React.PropTypes.func,
  }

  accept = () => {
    var { invite, acceptGame } = this.props;
    acceptGame(invite.key, invite.name);
  }

  reject = () => {
    var { invite, rejectGame } = this.props;
    rejectGame(invite.key);
  }

  render() {
    var { invite } = this.props;
    return (
      <Row>
        <Col md={6}>
          {invite.name}
        </Col>
        <Col md={3}>
          <Button
            bsSize="small"
            bsStyle="success"
            onClick={this.accept}>Accept</Button>
        </Col>
        <Col md={3}>
          <Button
            bsSize="small"
            bsStyle="danger"
            onClick={this.reject}>Reject</Button>
        </Col>
      </Row>
    );
  }
}
