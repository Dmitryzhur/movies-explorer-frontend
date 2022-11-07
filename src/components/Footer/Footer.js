import './Footer.css';

function Footer() {
	return (
		<footer className="footer">
			<h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
			<div className='footer__info'>
				<p className='footer__year'>&copy; 2022</p>
				<nav className='footer__nav'>
					<a href='https://practicum.yandex.ru/web/' className='footer__link'>Яндекс.Практикум</a>
					<a href='https://github.com/Dmitryzhur/' className='footer__link'>Github</a>
				</nav>
			</div>
		</footer>
	)
}

export default Footer;