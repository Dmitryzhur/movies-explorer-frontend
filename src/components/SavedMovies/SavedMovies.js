import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
	const loggedIn = true;

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='saved-movies'>
				<SearchForm />
				<MoviesCardList />
			</main>
			<Footer />
		</>
	)
}

export default SavedMovies;