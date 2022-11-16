import './FilterCheckbox.css';
import { useCallback, useState, memo } from "react";

const FilterCheckbox = memo(() => {
	const [isSelectedShortMovie, setIsSelectedIsShortMovie] = useState(false);
	const onSelectShortMovie = useCallback(
		() => setIsSelectedIsShortMovie(!isSelectedShortMovie),
		[isSelectedShortMovie]
	);
	return (
		<div className='checkbox__container'>
			<div className={`checkbox__short-box ${!isSelectedShortMovie ? "isSelectedBox" : ""}`} onClick={onSelectShortMovie}>
				<div className={`checkbox__short-item ${!isSelectedShortMovie ? "isSelectedItem" : ""}`} />
			</div>
			<div className='checkbox__title'>Короткометражки</div>
		</div>
	);
});

export default FilterCheckbox;