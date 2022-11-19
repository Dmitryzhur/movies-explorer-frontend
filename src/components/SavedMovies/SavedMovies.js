import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
	loggedIn,
	path,
	handleChangeSearch,
	handleSubmitSearchForm,
	toggleValueCheckbox,
	showedMovies,
	isCheckboxShort,
	searchWord,
	searchErrorClass,
	whileSearch,
	afterSearch,
	handleSaveClick,
	countSeeMovies
}) {

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='saved-movies'>
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
					savedCard={true}
				/>
			</main>
			<Footer />
		</>
	)
}

export default SavedMovies;