import './Portfolio.css';

function Portfolio() {
	return (
		<div className="portfolio">
			<h3 className="portfolio__heading">Портфолио</h3>
			<ul className="portfolio__link-list">
				<li className="portfolio__link-item">
					<a className="portfolio__link-ref" target="_blank" rel="noreferrer" href="https://github.com/Dmitryzhur/how-to-learn">Статичный сайт</a>
				</li>
				<li className="portfolio__link-item">
					<a className="portfolio__link-ref" target="_blank" rel="noreferrer" href="https://github.com/Dmitryzhur/russian-trave">Адаптивный сайт</a>
				</li>
				<li className="portfolio__link-item">
					<a className="portfolio__link-ref" target="_blank" rel="noreferrer" href="https://github.com/Dmitryzhur/react-mesto-api-full">Одностраничное приложение</a>
				</li>
			</ul>
		</div>
	)
}

export default Portfolio;