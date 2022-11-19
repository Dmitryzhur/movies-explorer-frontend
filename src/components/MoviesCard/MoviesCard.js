import './MoviesCard.css';
import { useState } from "react";

function MoviesCard({ key, movie, onSave, savedCard, isVisible }) {
	const [isOwn, setIsOwn] = useState(toggleSaveCloseClass());

	function toggleSaveCloseClass() {
		const buttonSaveCardClassName = movie.like ? 'movie-card__button_type_active' : '';
		return savedCard ? 'movie-card__button_type_close' : buttonSaveCardClassName;
	}

	// const isLiked = card.likes.some(i => i._id === currentUser._id);
	function handleSaveMovie(e) {
		e.preventDefault();
		onSave(movie);
		setIsOwn(toggleSaveCloseClass());
	}

	return (
		<li className={`movie-card ${isVisible ? 'movie-card__on' : ''}`}>
			<a className="movie-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
				<img className='movie-card__image' src={'https://api.nomoreparties.co/' + movie.image.url} alt='Обложка фильма' />
			</a>
			<div className='movie-card__container'>
				<h4 className='movie-card__name'>{movie.nameRU}</h4>
				<p className='movie-card__duration'>{`${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`}</p>
				<button className={`movie-card__button ${isOwn}`} onClick={handleSaveMovie} aria-label="Кнопка сохранения фильма" type='button' />
			</div>
		</li>
	)
}

export default MoviesCard;