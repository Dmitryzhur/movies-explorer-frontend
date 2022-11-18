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
import moviesApi from "../../utils/MoviesApi";

function App() {
	const [currentUser, setCurrentUser] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const history = useHistory();


	const [allMovies, setAllMovies] = useState([]);
	const [userMovies, setUserMovies] = useState([]);
	const [showedMovies, setShowedMovies] = useState([]);
	const [showedUserMovies, setShowedUserMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);

	const [searchEmpty, setSearchEmpty] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const [isUserCheckboxShort, setIsUserCheckboxShort] = useState(false);
	const [searchUserWord, setSearcUserhWord] = useState('');
	const [whileSearch, setWhileSearch] = useState(false);
	const afterSearch = Boolean(searchWord);

	const [shortMovie, setShortMovie] = useState([]);
	const [isCheckboxShort, setIsCheckboxShort] = useState(false);

	const [initialCount, setInitialCount] = useState(0);
	const [addedCount, setAddedCount] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);
	const [countSeeMovies, setCountSeeMovies] = useState(initialCount);

	function handleCountCardsOnPage() {
		if (width > 1800) {
			setInitialCount(20);
			setAddedCount(4);
		} else if (width > 1250) {
			setInitialCount(12);
			setAddedCount(3);
		} else if (width > 645) {
			setInitialCount(8);
			setAddedCount(2);
		} else {
			setInitialCount(5);
			setAddedCount(2);
		}
	}

	function handlerAddMovie() {
		setCountSeeMovies(countSeeMovies + addedCount);
	}

	useEffect(() => {
		setCountSeeMovies(initialCount);
		handleCountCardsOnPage()
	}, [initialCount, width]);


	window.onresize = (() => {
		setTimeout(() => {
			setWidth(window.innerWidth);
			handleCountCardsOnPage();
		}, 500)
	})


	const searchErrorClass = searchEmpty
		? 'search-form__error_visible'
		: '';

		

	function handleChangeSearch(evt) {
		setSearchEmpty(false);
		setSearchWord(evt.target.value)
	}

	function handleSubmitSearchForm(evt) {
		if (!searchWord) {
			evt.preventDefault();
			setSearchEmpty(true);
			setShowedMovies([]);
			return;
		}

		evt.preventDefault();
		setWhileSearch(true);
		moviesApi.getMovies()
			.then(loadedMovies => {
				setAllMovies(loadedMovies);
				localStorage.setItem('allMovies', JSON.stringify(loadedMovies));
				localStorage.setItem('searchWord', searchWord);
				setFilteredMovies(findMovies(loadedMovies, searchWord));
			})
			.catch(() => {
				setAllMovies([]);
				setFilteredMovies([]);
			})
			.finally(() => setWhileSearch(false));
	}

	useEffect(() => {
		if (filteredMovies.length === 0) {
			setShowedMovies([]);
		} else {
			if (isCheckboxShort) {
				setShowedMovies(filteredMovies.filter((movie) => movie.duration < 40).slice(0, countSeeMovies));
			} else {
				setShowedMovies(filteredMovies.slice(0, countSeeMovies));
			}
		}
	}, [filteredMovies, countSeeMovies, isCheckboxShort])

	function findMovies(loadedMovies, searchWord) {
		return loadedMovies.filter(movie => {
			if (movie.nameRU) {
				return movie.nameRU.toLowerCase().includes(searchWord.toLowerCase());
			}
			return;
		});
	}

	function toggleValueCheckbox(value) {
		if ('/movies') {
			setIsCheckboxShort(value);
			localStorage.setItem('checkboxValue', value);
		} else {
			setIsUserCheckboxShort(value);
			localStorage.setItem('userCheckboxValue', value);
		}
	}

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
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearchForm={handleSubmitSearchForm}
						toggleValueCheckbox={toggleValueCheckbox}
						showedMovies={showedMovies}
						isCheckboxShort={isCheckboxShort}
						searchWord={searchWord}
						searchErrorClass={searchErrorClass}
						allMovies={allMovies}
						addedCount={addedCount}
						setAddedCount={setAddedCount}
						handlerAddMovie={handlerAddMovie}
						countSeeMovies={countSeeMovies}
						filteredMovies={filteredMovies}
						initialCount={initialCount}
						setShowedMovies={setShowedMovies}
						whileSearch={whileSearch}
						afterSearch={afterSearch}
					/>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={SavedMovies}
						path="/saved-movies"
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearchForm={handleSubmitSearchForm}
						toggleValueCheckbox={toggleValueCheckbox}
						showedMovies={showedUserMovies}
						isCheckboxShort={isUserCheckboxShort}
						searchWord={searchUserWord}
						searchErrorClass={searchErrorClass}

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
