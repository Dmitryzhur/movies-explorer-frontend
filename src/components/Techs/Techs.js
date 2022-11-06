import './Techs.css';
import TitleForSection from '../TitleForSection/TitleForSection';

function Techs() {
	return (
		<section className='techs'>
			<div className='techs__title'>
				<TitleForSection title="Технологии" />
			</div>
			<div className='techs__info'>
				<h3 className='techs__info-heading'>7&nbsp;технологий</h3>
				<p className='techs__info-description'>На&nbsp;курсе веб-разработки мы освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
			</div>
			<div className='techs__list'>
				<div className='techs__item'>HTML</div>
				<div className='techs__item'>CSS</div>
				<div className='techs__item'>JS</div>
				<div className='techs__item'>React</div>
				<div className='techs__item'>Git</div>
				<div className='techs__item'>Express.js</div>
				<div className='techs__item'>mongoDB</div>
			</div>
		</section>
	)
}

export default Techs;