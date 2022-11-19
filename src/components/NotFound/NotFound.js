import { useHistory } from "react-router-dom";
import './NotFound.css';

function NotFound() {
	const history = useHistory();

	function goBack() {
		history.goBack();
	}

	return (
		<main className="not-found">
			<div className="not-found__info">
				<h1 className="not-found__title">404</h1>
				<p className="not-found__subtitle">Cтраница не найдена</p>
			</div>
			<button onClick={goBack} className="not-found__link" type='button'>Назад</button>
		</main>
	)
}

export default NotFound;