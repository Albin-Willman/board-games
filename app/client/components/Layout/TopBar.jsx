import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Nav from 'react-bootstrap/lib/Nav';

export default class TopBar extends React.Component {

  BuildNav() {
    return (
      <Nav pullRight>
        <LinkContainer to="/games">
          <NavItem eventKey={1}>New game</NavItem>
        </LinkContainer>
        <LinkContainer to="/profile">
          <NavItem eventKey={1}>Profile</NavItem>
        </LinkContainer>
        <LinkContainer to="/terms">
          <NavItem eventKey={2}>Terms</NavItem>
        </LinkContainer>
      </Nav>);
  }

  render() {
    var nav = this.BuildNav();
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="logotype">
              Board games
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          {nav}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
