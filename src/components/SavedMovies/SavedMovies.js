import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
	const loggedIn = true;

	return (
		<div className='saved-movies'>
			<Header loggedIn={loggedIn} />
			<SearchForm />
			<MoviesCardList />
			<Footer />
		</div>
	)
}

export default SavedMovies;