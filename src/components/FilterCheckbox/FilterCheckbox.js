import './FilterCheckbox.css';

function FilterCheckbox({ isCheckboxShort, toggleValueCheckbox }) {

	const handleChange = (evt) => {
		toggleValueCheckbox(evt.target.checked);
	};

	return (
			<div className="checkbox__container">
				<input
					className="checkbox__short-item"
					type="checkbox"
					id="check"
					placeholder='Короткометражки'
					onChange={handleChange}
					value={isCheckboxShort}
					checked={isCheckboxShort}
					required
				/>
				<label className="checkbox__short-box" htmlFor="check"/>
				<p className="checkbox__title">Короткометражки</p>
			</div>
	);
};

export default FilterCheckbox;