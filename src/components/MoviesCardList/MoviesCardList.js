import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import image from '../../images/film1.jfif';
import image1 from '../../images/avatar.jpg';

function MoviesCardList() {

	return (
		<section className='movies__section'>
			<div className='movies__container'>
				<div className='movies__list'>
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image1} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image1} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image1} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image} />
						<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image1} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image1} />
					<MoviesCard
						name="Соскучились по мне?"
						duration="100"
						image={image}
					/>
				</div>
				<div className='movies__container-with-button'>
					<button className='movies__button' type='button'>Ещё</button>
				</div>
			</div>
		</section>
	)
}

export default MoviesCardList;