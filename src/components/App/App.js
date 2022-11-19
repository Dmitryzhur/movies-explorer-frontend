import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
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
	const [filteredMovies, setFilteredMovies] = useState([]);

	const [searchEmpty, setSearchEmpty] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const [isUserCheckboxShort, setIsUserCheckboxShort] = useState(false);
	const [searchUserWord, setSearcUserhWord] = useState('');
	const [whileSearch, setWhileSearch] = useState(false);
	const [afterSearch, setAfterSearch] = useState(false);

	const [shortMovie, setShortMovie] = useState([]);
	const [isCheckboxShort, setIsCheckboxShort] = useState(false);

	const [initialCount, setInitialCount] = useState(0);
	const [addedCount, setAddedCount] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);
	const [countSeeMovies, setCountSeeMovies] = useState(initialCount);

	const [popup, setPopup] = useState(false);
	const [popupText, setPopupText] = useState('');

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
		evt.preventDefault();
		setSearchEmpty(false);
		setAfterSearch(false);
		setSearchWord(evt.target.value)
	}

	function handleUserChangeSearch(evt) {
		evt.preventDefault();
		setSearchEmpty(false);
		setAfterSearch(false);
		setSearcUserhWord(evt.target.value)
	}

	const checkLike = (id) => userMovies.some((movie) => parseInt(movie.movieId) === id);

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
				const movie = loadedMovies.map((movie) => {
					movie.like = checkLike(movie.id);
					return movie;
				})
				localStorage.setItem('userMovies', movie);
			})
			.catch(() => {
				setAllMovies([]);
				setFilteredMovies([]);
			})
			.finally(() => {
				setWhileSearch(false);
				setAfterSearch(true);
			});
	}

	function handleSubmitUserSearchForm(evt) {
		if (!searchUserWord) {
			evt.preventDefault();
			setSearchEmpty(true);
			setShowedMovies([]);
			return;
		} else {
			evt.preventDefault();
			setWhileSearch(true);
			localStorage.getItem('userMovies', JSON.parse(userMovies));
			setFilteredMovies(findMovies(userMovies, searchUserWord));
			localStorage.setItem('searchUserWord', searchUserWord);
			const movie = userMovies.map((movie) => {
				movie.like = checkLike(movie.id);
				return movie;
			})
			localStorage.setItem('userMovies', movie);
			setWhileSearch(false);
			setAfterSearch(true);
		} {
			// console.log('Я не справился, босс');
		}
	}

	useEffect(() => {
		if (filteredMovies.length === 0) {
			setShowedMovies([]);
		} else {
			if (isCheckboxShort) {
				setShowedMovies(filteredMovies.filter((movie) => movie.duration < 40).slice(0, countSeeMovies));
				localStorage.setItem('shortMovie', showedMovies);
			} else {
				setShowedMovies(filteredMovies.slice(0, countSeeMovies));
				localStorage.setItem('showedMovies', showedMovies);
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
		if (history.location.pathname === '/movies') {
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
				setPopup(true);
				setPopupText("Произошла ошибка. Попробуйте еще раз");
			})
			.finally(() => {
				setTimeout(() => {
					setPopup(false);
					setPopupText('')
				}, 2000)
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
				localStorage.getItem('checkboxValue');
				localStorage.getItem('userCheckboxValue');
			})
			.catch((err) => {
				setLoggedIn(false);
				console.log(err);
				setPopup(true);
				setPopupText("Неправильный логин или пароль");
			})
			.finally(() => {
				setTimeout(() => {
					setPopup(false);
					setPopupText('')
				}, 2000)
			})
	}

	function handleUpdateUser(data) {
		mainApi.editProfile(data)
			.then((res) => {
				console.log('успех');
				setCurrentUser(res);
				setPopup(true);
				setPopupText('Данные успешно обновлены!');
			})
			.catch((err) => {
				console.log(err);
				setPopup(true);
				setPopupText('Данные не обновлены! Возникла ошибка.')
			})
			.finally(() => {
				setTimeout(() => {
					setPopup(false);
					setPopupText('')
				}, 2000)
			})
	}

	function handleLogout() {
		auth.logout()
			.then(() => {
				setLoggedIn(false);
				localStorage.removeItem('searchWord');
				localStorage.removeItem('userMovies');
				localStorage.removeItem('shortMovie');
				localStorage.removeItem('showedMovies');
				localStorage.removeItem('checkboxValue');
				localStorage.removeItem('userCheckboxValue');
				localStorage.setremoveItemItem('searchUserWord');
				localStorage.setremoveItemItem('searchUserWord');
			})
			.catch((err) => console.log(err));
	}

	function handleSaveClick(movie, savedCard) {
		if (!savedCard && !movie.like) {
			mainApi.toggleSave(movie, savedCard, movie.like)
				.then((res) => {
					console.log("Хочу сохранить и ПОКАЗЫВАЮ", movie.like)
					userMovies.push(res);
					movie.like = true;
					console.log("movie.likemovie.likemovie.likemovie.like", movie.like)
					// userMovies.find((item) => item.id === movie.id).like = true;
					localStorage.setItem('userMovies', JSON.stringify(res));
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else {
			console.log("Хочу удалить и ПОКАЗЫВАЮ", movie._id)
			mainApi.deleteMovie(movie)
				.then((res) => {
					const newMovies = userMovies.filter((movie) => movie._id !== res._id);
					setUserMovies(newMovies)
					console.log(res)
				})
				.catch((err) => console.log(err));
		}
	}

	useEffect(() => {
		mainApi.getMovies()
			.then((userData) => {
				setUserMovies(userData);
				localStorage.setItem('userMovies', JSON.stringify(userMovies));
			})
			.catch((err) => {
				console.log(err);
			})
	}, [currentUser]);

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
						<Main
							isLoggedIn={loggedIn}
						/>
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
						handlerAddMovie={handlerAddMovie}
						countSeeMovies={countSeeMovies}
						filteredMovies={filteredMovies}
						initialCount={initialCount}
						whileSearch={whileSearch}
						afterSearch={afterSearch}
						handleSaveClick={handleSaveClick}
					/>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={SavedMovies}
						path="/saved-movies"
						handleChangeSearch={handleUserChangeSearch}
						handleSubmitSearchForm={handleSubmitUserSearchForm}
						toggleValueCheckbox={toggleValueCheckbox}
						showedMovies={userMovies}
						isCheckboxShort={isUserCheckboxShort}
						searchWord={searchUserWord}
						searchErrorClass={searchErrorClass}
						handleSaveClick={handleSaveClick}
						whileSearch={whileSearch}
						afterSearch={afterSearch}
						countSeeMovies={countSeeMovies}
					/>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={Profile}
						onSubmit={handleUpdateUser}
						onLogout={handleLogout}
						path="/profile"
						popupText={popupText}
						popup={popup}
					/>
					<Route path="/signin">
						<Login
							loggedIn={loggedIn}
							onLoginUser={handleLoginUser}
							popupText={popupText}
							popup={popup}
						/>
					</Route>
					<Route path="/signup">
						<Register
							loggedIn={loggedIn}
							onRegisterUser={handleRegisterUser}
							popupText={popupText}
							popup={popup}
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

export default withRouter(App);
