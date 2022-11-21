import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from "react";

function SearchForm({
	shortMovie,
	onSearchMovies,
	toggleValueCheckbox,
	searchWord
}) {
	const [searchWords, setSearchWords] = useState('');

	function handleSubmitSearchForm(evt) {
		evt.preventDefault();
		onSearchMovies(searchWords);
	}

	function handleChangeSearch(evt) {
		setSearchWords(evt.target.value)
	}

	useEffect(() => {
		setSearchWords(searchWord);
	}, [])

	return (
		<section className='search-form'>
			<div className='search-form__container'>
				<form
					className='search-form__form'
					noValidate
					name='SearchMovie'
					onSubmit={handleSubmitSearchForm}
					id="searchForm"
				>
					<input
						className='search-form__input'
						type='text'
						name='search-movie'
						placeholder='Фильм'
						required
						value={searchWords}
						onChange={handleChangeSearch}
					/>
					<button
						className='search-form__button'
						type='submit'
						form="searchForm"
					></button>
				</form>
				<span className={`search-form__error ${!searchWords && 'search-form__eror_visible'}`}>Прошу ввести слово, по которому хотите найти фильм</span>
				<div className='search-form__filter-checkbox'>
					<FilterCheckbox
						shortMovie={shortMovie}
						toggleValueCheckbox={toggleValueCheckbox}
					/>
				</div>
			</div>
		</section>
	)
}

export default SearchForm;