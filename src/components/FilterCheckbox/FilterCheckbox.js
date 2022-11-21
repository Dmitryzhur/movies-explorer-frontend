import './FilterCheckbox.css';

function FilterCheckbox({ shortMovie, toggleValueCheckbox }) {

	return (
		<div className="checkbox__container">
			<input
				className="checkbox__short-item"
				type="checkbox"
				id="check"
				placeholder='Короткометражки'
				checked={shortMovie}
				onChange={toggleValueCheckbox}
				required
			/>
			<label className="checkbox__short-box" htmlFor="check" />
			<p className="checkbox__title">Короткометражки</p>
		</div>
	);
};

export default FilterCheckbox;