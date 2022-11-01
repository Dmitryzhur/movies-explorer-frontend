import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
	return (
    <nav className="navigation">
      <Link to="/signup" className="nav__link nav__link_signup">Регистрация</Link>
      <Link to="/signin" className="nav__link nav__link_signin">Войти</Link>
    </nav>
  )
}

export default Navigation;