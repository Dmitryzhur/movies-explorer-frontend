import avatar from '../../images/avatar.jpg';
import './AboutMe.css';
import TitleForSection from '../TitleForSection/TitleForSection';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
	return (
		<section className='about-me'>
			<div className='about-project__title'>
				<TitleForSection title="Студент" />
			</div>
			<div className='about-me__content'>
				<div className='about-me__description'>
					<h3 className='about-me__title'>Дмитрий</h3>
					<h3 className='about-me__subtitle'>Фронтенд-разработчик, 26&nbsp;лет</h3>
					<p className='about-me__text'>Я из&nbsp;Екатеринбурга, закончил факультет магистратуры "Бизнес и менеджмент природных ресурсов и окружающей среды" в&nbsp;Уральском Федеральном Университете.
						Сейчас продолжаю обучение в&nbsp;аспирантуре. У&nbsp;меня есть жена и&nbsp;кошка. Я&nbsp;люблю слушать музыку и&nbsp;увлекаюсь просмотром сериалов. С&nbsp;2021&nbsp;года работаю в&nbsp;региональном операторе Свердловской области, занимаюсь реализацией вторичного сырья.
						После того, как прошёл курс по&nbsp;веб-разработке, активно продолжаю развиваться в&nbsp;новых веб-технологиях и&nbsp;создании пет-проектов.</p>
					<a className='about-me__ref' href='https://github.com/Dmitryzhur/'>Github</a>
				</div>
				<img className='about-me__avatar' alt='Аватар' src={avatar} />
			</div>
			<Portfolio />
		</section>
	)
}

export default AboutMe;