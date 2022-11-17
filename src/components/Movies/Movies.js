import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";

function Movies(props) {
	const currentUser = useContext(CurrentUserContext);

	const [allMovies, setAllMovies] = useState([]);
	// const [shortMovie, setShortMovie] = useState([]);
	const [searchWord, setSearchWord] = useState('');
	const [showedMovies, setShowedMovies] = useState([]);

	const [filteredMovies, setFilteredMovies] = useState([]);
	const [initialCount, setInitialCount] = useState(0);
	const [addedCount, setAddedCount] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);

	function handleCountCardsOnPage() {
		if (width > 1250) {
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

	window.onresize = (() => {
		setTimeout(() => {
			setWidth(window.innerWidth);
			handleCountCardsOnPage();
		}, 500)
	})

	useEffect(() => {
		handleCountCardsOnPage();
	}, [width])

	function handleChangeSearch(evt) {
		setSearchWord(evt.target.value)
	}

	function handleSubmitSearchForm(evt) {
		evt.preventDefault();

		moviesApi.getMovies()
			.then(loadedMovies => {
				setAllMovies(loadedMovies);
				localStorage.setItem('allMovies', JSON.stringify(loadedMovies));
				setFilteredMovies(findMovies(loadedMovies, searchWord));
			})
			.catch(() => {
				setAllMovies([]);
				setFilteredMovies([]);
			})
	}

	useEffect(() => {
		if (filteredMovies.length === 0) {
			setShowedMovies([]);
		} else {
			setShowedMovies(filteredMovies.slice(0, initialCount));
		}
	}, [filteredMovies])

	function findMovies(loadedMovies, searchWord) {
		return loadedMovies.filter(movie => {
			if (movie.nameRU) {
				return movie.nameRU.toLowerCase().includes(searchWord.toLowerCase());
			}
			return;
		});
	}

	return (
		<>
			<Header loggedIn={props.loggedIn} />
			<main className='movies'>
				<SearchForm
					searchWord={searchWord}
					handleChangeSearch={handleChangeSearch}
					handleSubmitSearchForm={handleSubmitSearchForm}
				/>
				<Preloader />
				<MoviesCardList
					movies={showedMovies}
					path={props.path} />
			</main>
			<Footer />
		</>
	)
}

export default Movies;