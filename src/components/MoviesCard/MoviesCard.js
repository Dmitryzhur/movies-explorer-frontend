import './MoviesCard.css';

function MoviesCard(props) {
	return (
		<li className='movie-card'>
			<img className='movie-card__image' src={props.image} alt='Обложка фильма' />
			<div className='movie-card__container'>
				<h4 className='movie-card__name'>{props.name}</h4>
				<p className='movie-card__duration'>{props.duration} мин.</p>
				<button className={`movie-card__button movie-card__button_type_active movie-card__button_type_close`} aria-label="" />
			</div>
		</li>
	)
}

export default MoviesCard;