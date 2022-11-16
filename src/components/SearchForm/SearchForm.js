import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
	handleSubmitSearchForm,
	searchWord,
	handleChangeSearch,
}) {

	return (
		<section className='search-form'>
			<div className='search-form__container'>
				<form className='search-form__form' noValidate name='SearchMovie' onSubmit={handleSubmitSearchForm}>
					<input
						className='search-form__input'
						type='text'
						name='search-movie'
						placeholder='Фильм'
						required
						value={searchWord}
						onChange={handleChangeSearch}
					/>
					<button className='search-form__button' type='submit'></button>
				</form>
				<div className='search-form__filter-checkbox'>
					<FilterCheckbox />
				</div>
			</div>
		</section>
	)
}

export default SearchForm;