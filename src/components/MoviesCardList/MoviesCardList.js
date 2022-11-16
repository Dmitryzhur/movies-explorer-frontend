import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onClick, path }) {


	return (
		<section className='movies__section'>
			<div className='movies__container'>
				<ul className='movies__list'>
					{movies.length !== 0 && movies.map(movie => {
						return (
							<MoviesCard
								key={movie.id}
								movie={movie}
								isSaved={false}
								path={path}
							/>
						)
					})}
				</ul>
				<div className='movies__container-with-button'>
					<button className={`movies__button`} onClick={onClick} type='button'>Ещё</button>
				</div>
			</div>
		</section>
	)
}

export default MoviesCardList;