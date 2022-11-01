import { Link } from "react-router-dom";
import './NotFound.css';

function NotFound({ OnClick }) {
	return (
		<section className="not-found">
			<div className="not-found__info">
				<h1 className="not-found__title">404</h1>
				<p className="not-found__subtitle">Cтраница не найдена</p>
			</div>
			<Link to="/" className="not-found__link" OnClick={OnClick}>Назад</Link>
		</section>
	)
}

export default NotFound;