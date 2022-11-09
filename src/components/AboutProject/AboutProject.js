import './AboutProject.css';
import TitleForSection from '../TitleForSection/TitleForSection';

function AboutProject() {
	return (
		<section className='about-project' id='about-project'>
			<div className='about-project__title'>
				<TitleForSection title="О проекте" />
			</div>
			<ul className='about-project__info'>
				<li className='about-project__info-cell'>
					<h3 className='about-project__info-heading'>Дипломный проект включал 5&nbsp;этапов</h3>
					<p className='about-project__info-description'>Составление плана, работу над&nbsp;бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
				</li>
				<li className='about-project__info-cell'>
					<h3 className='about-project__info-heading'>На выполнение диплома ушло 5&nbsp;недель</h3>
					<p className='about-project__info-description'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
				</li>
			</ul>
			<div className='about-project__duration'>
				<p className='about-project__duration-line about-project__duration-line_stage_backend'>1 неделя</p>
				<p className='about-project__duration-line about-project__duration-line_stage_frontend'>4 недели</p>
				<p className='about-project__duration-text about-project__duration-text_stage_backend'>Back-end</p>
				<p className='about-project__duration-text about-project__duration-text_stage_frontend'>Front-end</p>
			</div>
		</section>
	)
}

export default AboutProject;