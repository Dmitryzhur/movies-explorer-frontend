import './MoviesCard.css';
import { useContext } from "react";
import { MOVIES_URL } from "../../utils/constants"
import { useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function MoviesCard(props) {
	const history = useHistory();
	const currentUser = useContext(CurrentUserContext);
	const imageCard = (history.location.pathname === '/movies')
		? `${MOVIES_URL}/${props.movie.image.url}`
		: props.movie.image;

	const isOwn = (history.location.pathname === '/movies')
		? props.userMovies.some(i => (i.owner === currentUser._id && i.movieId === props.movie.id))
		: props.movie.owner === currentUser._id;

	const buttonSaveCardClassName = (
		`movie-card__button	${(isOwn) && `${history.location.pathname === '/movies'
			? 'movie-card__button_type_active'
			: 'movie-card__button_type_close'}`
		}`
	);

	const infoCard = (history.location.pathname === '/movies') ? {
		country: props.movie.country,
		director: props.movie.director,
		duration: props.movie.duration,
		year: props.movie.year,
		description: props.movie.description,
		image: `${MOVIES_URL}/${props.movie.image.url}`,
		nameRU: props.movie.nameRU,
		nameEN: props.movie.nameEN,
		trailerLink: props.movie.trailerLink,
		thumbnail: `${MOVIES_URL}${props.movie.image.formats.thumbnail.url}`,
		movieId: props.movie.id,
	} : {
		country: props.movie.country,
		director: props.movie.director,
		duration: props.movie.duration,
		year: props.movie.year,
		description: props.movie.description,
		image: props.movie.image,
		thumbnail: props.movie.thumbnail,
		trailerLink: props.movie.trailerLink,
		nameRU: props.movie.nameRU,
		nameEN: props.movie.nameEN,
		createdAt: props.movie.created_at,
		movieId: props.movie.id,
		owner: props.movie.owner,
		_id: props.movie._id,
	}

	function handleSaveMovie() {
		props.onSaveMovie(infoCard);
	}

	return (
		<li className={`movie-card movie-card__on`}>
			<a className="movie-card__link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
				<img className='movie-card__image' src={imageCard} alt='Обложка фильма' />
			</a>
			<div className='movie-card__container'>
				<h4 className='movie-card__name'>{props.movie.nameRU}</h4>
				<p className='movie-card__duration'>{`${Math.floor(props.movie.duration / 60)} ч ${props.movie.duration % 60} мин`}</p>
				<button className={buttonSaveCardClassName} onClick={handleSaveMovie} aria-label="Кнопка сохранения фильма" type='button' />
			</div>
		</li>
	)
}

export default MoviesCard;