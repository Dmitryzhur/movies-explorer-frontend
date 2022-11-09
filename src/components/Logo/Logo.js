import logo from '../../images/logo.svg';
import './Logo.css';

function Logo() {
	return (
		<>
			<img src={logo} className="logo" alt="logo" />
		</>
	)
}

export default Logo;