import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
	searchWord,
	handleChangeSearch,
	handleSubmitSearchForm,
	toggleValueCheckbox,
	isCheckboxShort,
	searchErrorClass
}) {

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
						value={searchWord}
						onChange={handleChangeSearch}
					/>
					<button
						className='search-form__button'
						type='submit'
						form="searchForm"
					></button>
				</form>
				<span className={`search-form__error ${searchErrorClass}`}>Прошу ввести слово, по которому хотите найти фильм</span>
				<div className='search-form__filter-checkbox'>
					<FilterCheckbox
						isCheckboxShort={isCheckboxShort}
						toggleValueCheckbox={toggleValueCheckbox}
					/>
				</div>
			</div>
		</section>
	)
}

export default SearchForm;