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
import { DURATION__SHORTMOVIES } from "../../utils/constants"

function App() {
	const [currentUser, setCurrentUser] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const history = useHistory();

	const [showedMovies, setShowedMovies] = useState([]);
	const [searchedUserMovies, setSearchedUserMovies] = useState([]); 
	const [userMovies, setUserMovies] = useState([]);
	const [userNewMovies, setUserNewMovies] = useState([]);

	const [searchEmpty, setSearchEmpty] = useState(false);
	const [searchUserEmpty, setSearchUserEmpty] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const [searchUserWord, setSearchUserWord] = useState('');
	const [searchedMoviesList, setSearchedMoviesList] = useState([]);
	const [searchedShortMoviesList, setSearchedShortMoviesList] = useState([]);
	const [isSearched, setIsSearched] = useState(false);

	const [whileSearch, setWhileSearch] = useState(false);
	const [afterSearch, setAfterSearch] = useState(false);
	const [buttonMoreMovies, setButtonMoreMovies] = useState(false);

	const [shortMovie, setShortMovie] = useState(false);
	const [shortSaveMovie, setShortSaveMovie] = useState(false);

	const [initialCount, setInitialCount] = useState(0);
	const [addedCount, setAddedCount] = useState(0);
	const [countCards, setCountCards] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);

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

	function handleAddMovie() {
		if (showedMovies.length - initialCount > addedCount) {
			setInitialCount(initialCount + addedCount);
		} else {
			setInitialCount(showedMovies.length);
			setButtonMoreMovies(false);
		}
	}

	function checkedButtonMoreMovies() {
		if (countCards > 3 && initialCount < countCards) {
			setButtonMoreMovies(true);
		} else {
			setButtonMoreMovies(false);
		}
	}

	useEffect(() => {
		handleCountCardsOnPage();
	}, [width])


	window.onresize = (() => {
		setTimeout(() => {
			setWidth(window.innerWidth);
			handleCountCardsOnPage();
		}, 500)
	})

	function handleSearchMovies(searchWord) {
		setSearchedMoviesList([]);
		setSearchedShortMoviesList([]);
		setSearchEmpty(false);
		setWhileSearch(true);
		moviesApi.getMovies()
			.then(loadedMovies => {
				if (loadedMovies) {
					if (shortMovie === true) {
						const res = loadedMovies.filter((movie) => {
							return movie.nameRU.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1
								&& movie.duration < DURATION__SHORTMOVIES;
						});
						if (res.length === 0) {
							setSearchEmpty(true);
						}
						setSearchedShortMoviesList(res);
						localStorage.setItem('searchedMoviesList', JSON.stringify(res));
						localStorage.setItem('searchWord', searchWord);
						localStorage.setItem('shortMovies', shortMovie)
					} else {
						const res = loadedMovies.filter((movie) => {
							return movie.nameRU.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1;
						});
						if (res.length === 0) {
							setSearchEmpty(true);
						}
						setSearchedMoviesList(res);
						localStorage.setItem('searchedMoviesList', JSON.stringify(res));
						localStorage.setItem('searchWord', searchWord);
						localStorage.setItem('shortMovies', shortMovie)
					}
				} else {
					setShowedMovies([]);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setWhileSearch(false);
				setAfterSearch(true);
			})
	}

	function handleSearchUserMovies(searchWord) {
		setIsSearched(true);
		setSearchUserWord(searchWord);
		setSearchUserEmpty(false);
		setSearchedUserMovies([]);
		setWhileSearch(true);
		mainApi.getMovies()
			.then((userData) => {
				if (shortSaveMovie) {
					const res = userData.filter((movie) => {
						return movie.nameRU.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1 && movie.duration < 40;
					});
					if (res.length === 0) {
						setSearchUserEmpty(true)
					}
					setSearchedUserMovies(res);
				} else {
					const res = userData.filter((movie) => {
						return movie.nameRU.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1;
					});
					if (res.length === 0) {
						setSearchUserEmpty(true)
					}
					setSearchedUserMovies(res);
				}
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(() => {
				setWhileSearch(false);
				setAfterSearch(true);
			})
	}

	function loadMovies() {
		const searchedList = JSON.parse(localStorage.getItem('searchedMoviesList'));
		const searchWord = localStorage.getItem('searchWord');
		setSearchWord(searchWord);
		if (searchedList && searchedList !== []) {
			setShowedMovies(searchedList);
		}
	}

	function toggleValueSaveCheckbox() {
		setShortSaveMovie(!shortSaveMovie);
	}

	function toggleValueCheckbox() {
		setShortMovie(!shortMovie);
	}

	function handleRegisterUser(data) {
		auth.register(data)
			.then((res) => {
				handleLoginUser({
					email: data.email,
					password: data.password
				});
				return res;
			})
			.catch((err) => {
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
				history.push('/movies');
			})
			.catch((err) => {
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
				setSearchEmpty(false);
				setShortMovie(false);
				setSearchUserEmpty(false);
				setWhileSearch(false);
				setAfterSearch(false);
				setButtonMoreMovies(false);
				setSearchWord('');
				setCountCards(0);
				setSearchedUserMovies([]);
				setUserNewMovies([]);
				setUserMovies([]);
				setShowedMovies([]);
				setSearchedMoviesList([]);
				setSearchedShortMoviesList([]);
				localStorage.removeItem('searchWord');
				localStorage.removeItem('shortMovies');
				localStorage.removeItem('searchedMoviesList');
			})
			.catch((err) => {
				console.log(err);
				setPopup(true);
				setPopupText('Произошла ошибка. Повторите запрос.')
			})
			.finally(() => {
				setTimeout(() => {
					setPopup(false);
					setPopupText('')
				}, 2000)
			})
	}

	function handleMovieSave(movie) {
		const isSaved = userMovies.some(i => (i.movieId === movie.movieId)) || movie.owner;
		const movieWithId = userMovies.find((i) => i.movieId === movie.movieId) || movie;
		mainApi.toggleSave(movie, isSaved, movieWithId)
			.then(() => {
				mainApi.getMovies()
					.then((userData) => {
						setUserMovies(userData);
						setUserNewMovies(userData);
					})
					.catch((err) => {
						console.log(err);
					})
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getUserMovies() {
		mainApi.getMovies()
			.then((userData) => {
				setUserMovies(userData);
				setUserNewMovies(userData);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function checkToken() {
		mainApi.getUser()
			.then((res) => {
				if (res) {
					setCurrentUser(res);
					setLoggedIn(true);
					history.push(history.location.pathnam);
				}
			})
			.catch((err) => {
				console.log(err);
			})
	}

	useEffect(() => {
		checkToken();
	}, []);

	useEffect(() => {
		if (loggedIn) {
			mainApi.getUser()
				.then((res) => {
					setCurrentUser(res);
					setLoggedIn(true);
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}, [loggedIn]);

	useEffect(() => {
		if (loggedIn) {
			getUserMovies();
		}
	}, [loggedIn])

	useEffect(() => {
		if (loggedIn) {
			loadMovies();
		}
	}, [loggedIn, searchedMoviesList, searchedShortMoviesList])

	useEffect(() => {
		handleSearchUserMovies(searchUserWord);
	}, [shortSaveMovie])

	useEffect(() => {
		setUserMovies(searchedUserMovies);
	}, [searchedUserMovies, shortSaveMovie, userMovies])

	useEffect(() => {
		if (loggedIn) {
			setCountCards(showedMovies.length);
		}
	}, [showedMovies])

	useEffect(() => {
		if (loggedIn) {
			checkedButtonMoreMovies();
		}
	}, [countCards])

	useEffect(() => {
		if (loggedIn) {
			if (localStorage.getItem('shortMovies')) {
				setShortMovie(JSON.parse(localStorage.getItem('shortMovies')));
			}
		}
	}, [loggedIn])

	useEffect(() => {
		if (localStorage.getItem('searchWord')) {
			handleSearchMovies(localStorage.getItem('searchWord'));
		}
	}, [shortMovie])

	return (
		<CurrentUserContext.Provider value={currentUser} >
			<div className="page">
				<Switch>
					<Route exact path="/">
						<Main
							loggedIn={loggedIn}
						/>
					</Route>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={Movies}
						path="/movies"
						shortMovie={shortMovie}
						onSaveMovie={handleMovieSave}
						userMovies={userNewMovies}
						searchWord={searchWord}
						movies={showedMovies.slice(0, initialCount)}
						showedMovies={handleSearchMovies}
						whileSearch={whileSearch}
						afterSearch={afterSearch}
						popupText={popupText}
						popup={popup}
						searchEmpty={searchEmpty}
						toggleValueCheckbox={toggleValueCheckbox}
						handleAddMovie={handleAddMovie}
						buttonMoreMovies={buttonMoreMovies}
					/>
					<ProtectedRoute
						loggedIn={loggedIn}
						component={SavedMovies}
						path="/saved-movies"
						userMovies={userMovies}
						movies={userMovies || []}
						shortMovie={shortSaveMovie}
						onSaveMovie={handleMovieSave}
						setIsSearched={setIsSearched}
						isSearched={isSearched}
						allSaveMovie={userNewMovies}
						searchWord={searchUserWord}
						whileSearch={whileSearch}
						afterSearch={afterSearch}
						searchEmpty={searchUserEmpty}
						popupText={popupText}
						popup={popup}
						showedMovies={handleSearchUserMovies}
						toggleValueCheckbox={toggleValueSaveCheckbox}
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
