import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
 return (
	<div className='movies'>
		<Header />
		<SearchForm />
		<Preloader />
		<MoviesCardList />
		<Footer />
	</div>
 )
}

export default Movies;