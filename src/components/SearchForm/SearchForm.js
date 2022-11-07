import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSubmit }) {
	return (
		<section className='search-form'>
			<div className='search-form__container'>
				<form className='search-form__form' name='SearchMovie' onSubmit={onSubmit}>
					<input className='search-form__input' type='text' name='search-movie' placeholder='Фильм'></input>
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