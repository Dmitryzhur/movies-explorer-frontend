import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect } from "react";

function SavedMovies(props) {

	useEffect(() => {
		props.setIsSearched(false)
	}, []);

	return (
		<>
			<Header loggedIn={props.loggedIn} />
			<main className='saved-movies'>
				<SearchForm
					shortMovie={props.shortMovie}
					onSearchMovies={props.showedMovies}
					toggleValueCheckbox={props.toggleValueCheckbox}
					searchWord={props.searchWord}
				/>

				<MoviesCardList
					userMovies={props.userMovies}
					onSaveMovie={props.onSaveMovie}
					searchEmpty={props.searchEmpty}
					whileSearch={props.whileSearch}
					afterSearch={props.afterSearch}
					movies={props.isSearched
						? props.movies
						: props.allSaveMovie}
				/>
				{<p className={`popupText ${props.popup && 'popupText_on'}`}>
					{props.popupText}
				</p>}
			</main>
			<Footer />
		</>
	)
}

export default SavedMovies;