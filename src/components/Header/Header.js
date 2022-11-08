import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
	return (
		<header className="header">
        <img src={logo} className="logo" alt="logo" />
				<Navigation loggedIn={loggedIn}/>
      </header>
	)
}

export default Header;