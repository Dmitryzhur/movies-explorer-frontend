import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Logo.css';

function Logo() {
	return (
		<Link className="logo" to="/">
			<img src={logo} className="logo__img" alt="logo" />
		</Link>
	)
}

export default Logo;