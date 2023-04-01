import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from '../actions/auth'
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	colornav: {
		backgroundImage: "url(/optin2.jpg)"
	}
}));

const NavbarItem = ({ auth: { isAuthenticated }, logout }) => {
	const authLinks = (
		<Nav className='mr-auto'>
			{/* <Nav.Link as={Link} to="/library">
				MyLibrary
			</Nav.Link> */}
			<Nav.Link as={Link} to='/profile'>
				MyProfile
			</Nav.Link>
			<Nav.Link onClick={logout} as={Link} to='/'>
				Logout
			</Nav.Link>
		</Nav >
	);
	const guestLinks = (
		<Nav className='mr-auto'>
			<Nav.Link as={Link} to='/SIGNUP'>
				Register
			</Nav.Link>
			<Nav.Link as={Link} to='/LOGIN'>
				Login
			</Nav.Link>
		</Nav >
	);
    const classes = useStyles();
	return (
        
		<Navbar bg='dark' variant='dark' expand='lg' sticky="top">
			<Navbar.Brand as={Link} to='/'>
				Home
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link as={Link} to='/BOOKS'>
						Insert Books
					</Nav.Link>
					
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
					
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

NavbarItem.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarItem);
