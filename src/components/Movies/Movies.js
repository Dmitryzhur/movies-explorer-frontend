import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ButtonMore from '../ButtonMore/ButtonMore';

function Movies(props) {

	return (
		<>
			<Header
				loggedIn={props.loggedIn}
			/>
			<main className='movies'>
				<SearchForm
					searchWord={props.searchWord}
					shortMovie={props.shortMovie}
					toggleValueCheckbox={props.toggleValueCheckbox}
					onSearchMovies={props.showedMovies}
				/>
				<MoviesCardList
					movies={props.movies}
					userMovies={props.userMovies}
					onSaveMovie={props.onSaveMovie}
					searchEmpty={props.searchEmpty}
					whileSearch={props.whileSearch}
					afterSearch={props.afterSearch}
				/>
				<ButtonMore
					buttonMoreMovies={props.buttonMoreMovies}
					handleAddMovie={props.handleAddMovie}
				/>
				{<p className={`popupText ${props.popup && 'popupText_on'}`}>
					{props.popupText}
				</p>}
			</main>
			<Footer />
		</>
	)
}

export default Movies;