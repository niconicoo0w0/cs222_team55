import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import Font from 'react-font'
const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const { email, password } = formData;
    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
      };
    
      if (isAuthenticated) {
        alert('Login successfully')
        return <Redirect to="/" />;
      }

    return (
      <div>
        <div className="loginContainer">
            <div className="loginPage">
                <form className="loginForm">
                <div className="text">Sign in</div>
                <form className="formBox" action="/" method="get">
                    <label className="formLabel" htmlFor="header-search">
                        <input 
                            className="formInput"
                            name="email"
                            value={email}
                            type="text"
                            onChange={onChange}
                            placeholder="Email"
                        />
                    </label>
                    <label className="formLabel" htmlFor="header-search">
                        <input 
                            className="formInput"
                            name="a"
                            type="text"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                        />
                    </label>
                    <span className="submitButton" onClick={onSubmit} type='submit' color='green'>
                        <div className="submitButtonText">SIGN IN</div>
                    </span>
                    <div>
                        <div className="SwitchToSignup">
                            Don't have an account?&nbsp;
                            <Link to="/SIGNUP" className="LinkToSignup">Sign up</Link> 
                        </div>
                    </div>
                </form>
            </form>
            <div className="loginWelcome">
                <div className="loginWelcomeText">
                    Welcome Back!
                </div>
            </div>
        </div>
            </div>
      </div>
    )
  }
//   export default Login;
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { login })(Login);