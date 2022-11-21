import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {

	return (
		<section className='movies__section'>
			<div className='movies__container'>
				<p className={`movies__message ${props.searchEmpty && 'movies__message_active'}`}>Ничего не найдено</p>
				{props.whileSearch ? (
					<Preloader />
				) : props.movies.length !== 0 ? (
					<ul className="movies__list">
						{props.movies.map((movie) => (
							<MoviesCard
								key={movie.id}
								movie={movie}
								onSaveMovie={props.onSaveMovie}
								userMovies={props.userMovies}
							/>
						))}
					</ul>
				) : (
					props.afterSearch && (
						<div className="movies__container">
							<h2 className="movies__emptySearch">Здесь такого нет!</h2>
						</div>
					)
				)}
			</div>
		</section>
	)
}

export default MoviesCardList;

