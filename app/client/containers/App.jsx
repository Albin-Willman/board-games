
import React from 'react';
import { connect } from 'react-redux';

// ReactBoostrap components:
import Grid from 'react-bootstrap/lib/Grid';
import TopBar from 'components/Layout/TopBar.jsx';

import { connectToUserState } from 'services/app-services.jsx';

@connect(s => s)
export default class App extends React.Component {

  static proptypes = {
    app: React.PropTypes.shape({
      loggedIn: React.PropTypes.bool,
    }),
  }

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(connectToUserState());
  }

  render() {
    var { loggedIn } = this.props.app;
    return (
      <div>
        <TopBar loggedIn={loggedIn} />
        <Grid style={{marginTop: '100px'}}>
          {this.props.children}
        </Grid>
      </div>
      );
    }
  }
