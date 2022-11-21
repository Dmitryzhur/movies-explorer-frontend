import React from 'react';
import './ButtonMore.css';

function ButtonMore({ buttonMoreMovies, handleAddMovie }) {

	return (
		<section className="movies__container-with-button">
			<button className={`movies__button ${buttonMoreMovies && 'movies__button_active'}`} type='button' onClick={handleAddMovie}>
				Ещё
			</button>
		</section>
	);
}
export default ButtonMore;
