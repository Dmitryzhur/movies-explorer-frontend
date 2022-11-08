import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from	'../Promo/Promo';
import AboutProject from	'../AboutProject/AboutProject';
import Techs from	'../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';


function Main() {
	const loggedIn = false;

	return (
		<div className='main'>
			<Header loggedIn={loggedIn}/>
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe />
			<Footer />
		</div>
	)
}

export default Main;