import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
	movies,
	path,
	countSeeMovies,
	whileSearch,
	afterSearch,
	handleSaveClick,
	savedCard
}) {

	return (
		<section className='movies__section'>
			<div className='movies__container'>
				{whileSearch ? (
					<Preloader />
				) : movies.length !== 0 ? (
					<ul className="movies__list">
						{movies.map((movie, id) => (
							<MoviesCard
								key={movie.id}
								movie={movie}
								onSave={handleSaveClick}
								path={path}
								isVisible={id <= countSeeMovies}
								savedCard={savedCard}
							/>
						))}
					</ul>
				) : (
					afterSearch && (
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

