import './MoviesCard.css';
import { useState, useCallback } from "react";

function MoviesCard({ key, movie, isSaved, saveCard, path }) {
	// const currentUser = useContext(CurrentUserContext);

	// const isLiked = card.likes.some(i => i._id === currentUser._id);
	const [isOwn, setIsOwn] = useState(false);
	const handleSaveCard = useCallback(
		() => {
			console.log("Я сохранил! (враньё, скоро научусь)");
			setIsOwn(!isOwn);
		},
		[isOwn]);

	const buttonSaveCardClassName = (
		`movie-card__button ${(isOwn) ? 'movie-card__button_type_active' : ''}`
	);

	return (
		<li className='movie-card'>
			<a className="movie-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
				<img className='movie-card__image' src={'https://api.nomoreparties.co/' + movie.image.url} alt='Обложка фильма' />
			</a>
			<div className='movie-card__container'>
				<h4 className='movie-card__name'>{movie.nameRU}</h4>
				<p className='movie-card__duration'>{`${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`}</p>
				<button className={buttonSaveCardClassName} onClick={handleSaveCard} aria-label="Кнопка управления фильмом" />
			</div>
		</li>
	)
}

export default MoviesCard;