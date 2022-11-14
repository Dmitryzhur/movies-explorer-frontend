import { useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import NavBurger from '../NavBurger/NavBurger';

function Navigation({ loggedIn }) {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

	const onEditProfile = () => {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}


	if (!loggedIn) {
		return (
			<nav className="navigation">
				<Link to="/signup" className="nav__link nav__link_signup">Регистрация</Link>
				<Link to="/signin" className="nav__link nav__link_signin">Войти</Link>
			</nav>
		)
	} else {
		return (
			<>
				<NavBurger
					onEditProfile={onEditProfile}
					isOpen={isEditProfilePopupOpen}
				/>
				<nav className={`navigation__burger ${isEditProfilePopupOpen ? "" : "navigation__burger_inactive"}`}>
					<div className="navigation__container">
						<div className="nav-movies">
							<Link to="/" className="nav__link nav__burger-link nav__link_main">Главная</Link>
							<Link to="/movies" className="nav__link nav__burger-link nav__link_movies nav__link_type_active">Фильмы</Link>
							<Link to="/saved-movies" className="nav__link nav__burger-link nav__link_saved-movies">Сохраненные фильмы</Link>
						</div>
						<Link to="/profile" className="nav__link nav__burger-link nav__link_profile">
							<p className="nav__link_profile-text">Аккаунт</p>
							<div className="nav__link_profile-avatar"></div>
						</Link>
					</div>
				</nav>
			</>
		)
	}
}

export default Navigation;