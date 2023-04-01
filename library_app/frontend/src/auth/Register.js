import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

const Register = ({ register, isAuthenticated }) =>  {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log("here")
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    alert('Register successfully');
    return <Redirect to="/" />;
  }

    return (
      <div className="signupContainer">
          <form className="signupForm">
              <div className="text">SIGN UP</div>
                <form className="formBox" action="/" method="get">
                <label className="formLabel" htmlFor="header-search">
                  <span className="visually-hidden"> Username </span>
                  <input 
                    className="formInput"
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Name"
                  />
              </label>
                <label className="formLabel" htmlFor="header-search">
                  <span className="visually-hidden"> Email </span>
                  <input 
                    className="formInput"
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                  />
              </label>
              <label className="formLabel" htmlFor="header-search">
                  <span className="visually-hidden"> Password </span>
                  <input 
                    className="formInput"
                    type="text"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                  />
              </label>
              <label className="formLabel" htmlFor="header-search">
                  <span className="visually-hidden"> Confirm Password </span>
                  <input 
                    className="formInput"
                    type="text"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder="Confirm Password"
                  />
              </label>
                  <span className="submitButton" onClick={onSubmit} type='submit' color='green'>
                    <div className="submitButtonText">Register</div>
                  </span>
                </form>
                <div className="SwitchToLogin">
                  Already have an account?&nbsp;
                  <Link to="/LOGIN" className="LinkToLogin">Log in</Link> 
                </div>
          </form>
      </div>
    )
  } 

  Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { register })(Register);