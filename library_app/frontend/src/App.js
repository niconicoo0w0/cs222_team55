import React, { useEffect } from "react";
import About from "./nav/About";
import Books from "./nav/Books";
import UserProfile from "./nav/Profile";
import Register from "./auth/Register";
import Contactus from "./nav/Contactus";
import Mainheader from "./main/Mainheader";
import Mainfooter from "./main/Mainfooter";
import Main from "./main/Main"
import Login from "./auth/Login"
import HttpsRedirect from 'react-https-redirect';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { LOGOUT } from './actions/types';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import NavbarItem from './nav/navbar_item';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
function App() {
	useEffect(() => {
		// check for token in LS
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());

		// log user out from all tabs if they log out in one tab
		window.addEventListener('storage', () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);

	return (
		<>		
		<Provider store={store}>
			<Router>
				<NavbarItem />
				<Switch>
					<Route exact path='/'>
            <Main />
					</Route>
					<Route path='/ABOUT'>
            <About/>
					</Route>
          <Route path = "/BOOKS">
                <Books/>
          </Route>
					<Route path='/SIGNUP'>
						<Register/>
					</Route>
					<Route path='/CONTACTUS'>
						<Contactus/>
					</Route>
					<Route path='/LOGIN'>
						<Login/>
					</Route>
					<Route path='/profile'>
						<UserProfile />
					</Route>
				</Switch>
			</Router>
		</Provider>
		</>
	);
}

export default App;
