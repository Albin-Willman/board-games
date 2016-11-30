import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';

export default class Terms extends React.Component {
  render() {

    return (
      <Row>
        <Col md={12}>
          <Well>
            <h1>Terms of use</h1>
            <p>
              This is a small private project written mainly for fun. Treat it as such,
              I leave no guarantees regarding uptime, data retention or anything like that.
              This time tomorrow I might host something completely different here.
            </p>
            <p>
              By using this service you accept that I might store any, all or none of the data
              submitted to the app. I am not aiming for profit and will not sell any personal data
              collected.
            </p>
            <h2>Cookies</h2>
            <p>
              I will use cookies both first party and third party. The main reason for this is to
              enable functionality such as user sessions.
            </p>
            <p>
              I might also use cookies for tracking user behaviour or errors. Google analytics
              might be a provider of such cookies.
            </p>
            <p>
              Another use might be for advertising.
            </p>
            <h2>Questions</h2>
            <p>
              If you have any questions regarding how I use cookies or data feel free to ask me at
              twitter:
              <a
                href="https://twitter.com/SvenssonAlbin"
                target="_blank"
                style={{ margin: '0 3px' }}>
                @SvenssonAlbin
              </a>
              or just check out the
              <a
                href="https://github.com/Albin-Willman/board-games"
                target="_blank"
                style={{ marginLeft: '3px' }}>
                source code
              </a>, it is 100% open.

            </p>
          </Well>
        </Col>
      </Row>
      );
    }
  }
