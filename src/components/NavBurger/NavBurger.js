import './NavBurger.css';

function NavBurger({ onEditProfile, isOpen }) {
	return (
		<>
			<div className={`navburger ${isOpen ? 'navburger_active' : ''}`} onClick={onEditProfile}>
					<span className="navburger__span" />
					<span className="navburger__span" />
					<span className="navburger__span" />
			</div>
		</>
	)
}

export default NavBurger;