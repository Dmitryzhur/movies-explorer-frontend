import { useState, useEffect } from "react";
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";

function Movies(props) {
	const loggedIn = true;
	// const savedFilm = false;

	const [allMovies, setAllMovies] = useState([]);
	// const [shortMovie, setShortMovie] = useState([]);
	const [showedMovies, setShowedMovies] = useState([]);

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
			console.log(width);
			handleCountCardsOnPage();
		}, 500)
	})

	useEffect(() => {
		handleCountCardsOnPage();
	}, [width])


	useEffect(() => {
		setShowedMovies(allMovies.slice(0, initialCount));
	}, [allMovies])

	useEffect(() => {
		console.log("Movies, showedMovies:", showedMovies);
	}, [showedMovies])

	useEffect(() => {
		// if (loggedIn) {
		moviesApi.getMovies()
			.then(loadedMovies => {
				setAllMovies(loadedMovies);
				localStorage.setItem('allMovies', JSON.stringify(loadedMovies));
				// let userSavedMovies = data.filter(i => i.owner === currentUser._id);
				// setSavedMovie(userSavedMovies);
			})
			.catch((err) => {
				console.log(err)
			});
		// }
		// }, [loggedIn])
	}, [])

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='movies'>
				<SearchForm />
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