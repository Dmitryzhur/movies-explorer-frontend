import "./Navigation.css";
import { Link } from "react-router-dom";


function Navigation({ loggedIn }) {
	if (!loggedIn) {
		return (
			<nav className="navigation">
				<Link to="/signup" className="nav__link nav__link_signup">Регистрация</Link>
				<Link to="/signin" className="nav__link nav__link_signin">Войти</Link>
			</nav>
		)
	} else {
		return (
			<nav className="navigation">
				<div className="nav-movies">
					<Link to="/movies" className="nav__link nav__link_movies">Фильмы</Link>
					<Link to="/saved-movies" className="nav__link nav__link_saved-movies">Сохраненные фильмы</Link>
				</div>
				<Link to="/profile" className="nav__link nav__link_profile">
					<p className="nav__link_profile-text">Аккаунт</p>
					<div className="nav__link_profile-avatar"></div>
				</Link>

			</nav>
		)
	}
}

export default Navigation;