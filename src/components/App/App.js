import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';

function App() {
	const [currentUser, setCurrentUser] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const history = useHistory();

	useEffect(() => {
		return console.log("Работаю и залогинен", loggedIn);
		// history.push('/movies');
		// history.push('/profile');
	}, [loggedIn])

	function handleRegisterUser(data) {
		auth.register(data)
			.then((res) => {
				setLoggedIn(true);
				history.push('/signin');
			})
			.catch((err) => {
				setLoggedIn(false);
				console.log(err);
			})
	}

	function handleLoginUser(data) {
		auth.authorize(data)
			.then((res) => {
				setLoggedIn(true);
				setCurrentUser(res);
			})
			.then(() => {
				history.push('/movies');
				console.log("loggedIn в авторизации показывает", loggedIn);
			})
			.catch((err) => {
				setLoggedIn(false);
				console.log(err);
				// history.push('/');
			})
	}

	function handleUpdateUser(data) {
		mainApi.editProfile(data)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	function handleLogout() {
		auth.logout()
			.then(() => {
				setLoggedIn(false);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		mainApi.getUser()
			.then((res) => {
				setCurrentUser(res);
				setLoggedIn(true);
			})
			.then(() => {
				// history.push(history.location.pathname);
				history.push("/movies");
			})
			.catch((err) => { console.log(err) })
	}, [loggedIn, history]);

	return (
		<CurrentUserContext.Provider value={currentUser} >
			<div className="page">
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={Movies}
						path="/movies"
					/>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={SavedMovies}
						path="/saved-movies"
					/>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={Profile}
						onSubmit={handleUpdateUser}
						onLogout={handleLogout}
						path="/profile"
					/>
					<Route path="/signin">
						<Login
							loggedIn={loggedIn}
							onLoginUser={handleLoginUser}
						/>
					</Route>
					<Route path="/signup">
						<Register
							loggedIn={loggedIn}
							onRegisterUser={handleRegisterUser}
						/>
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
