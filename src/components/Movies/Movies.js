import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ButtonMore from '../ButtonMore/ButtonMore';

function Movies({
	loggedIn,
	path,
	handleChangeSearch,
	handleSubmitSearchForm,
	toggleValueCheckbox,
	showedMovies,
	isCheckboxShort,
	searchWord,
	searchErrorClass,
	handlerAddMovie,
	countSeeMovies,
	filteredMovies,
	initialCount,
	whileSearch,
	afterSearch,
	handleSaveClick
}) {

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='movies'>
				<SearchForm
					searchWord={searchWord}
					handleChangeSearch={handleChangeSearch}
					handleSubmitSearchForm={handleSubmitSearchForm}
					toggleValueCheckbox={toggleValueCheckbox}
					isCheckboxShort={isCheckboxShort}
					searchErrorClass={searchErrorClass}
				/>
				<MoviesCardList
					movies={showedMovies}
					path={path}
					isCheckboxShort={isCheckboxShort}
					countSeeMovies={countSeeMovies}
					whileSearch={whileSearch}
					afterSearch={afterSearch}
					handleSaveClick={handleSaveClick}
					savedCard={false}
				/>
				{(filteredMovies.length > initialCount && filteredMovies.length > countSeeMovies) &&
				<ButtonMore onClick={handlerAddMovie} />}
			</main>
			<Footer />
		</>
	)
}

export default Movies;