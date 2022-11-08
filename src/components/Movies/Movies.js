import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
	const loggedIn = true;

 return (
	<div className='movies'>
		<Header loggedIn={loggedIn} />
		<SearchForm />
		<Preloader />
		<MoviesCardList />
		<Footer />
	</div>
 )
}

export default Movies;