import './Profile.css';
import Header from '../Header/Header';

const name = "Дмитрий";
const email = "Qwerty@mail.ru";

function Profile() {
	const loggedIn = true;

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='profile'>
				<div className='profile__greeting'>
					<h2 className='profile__title'>Привет, {name}!</h2>
				</div>
				<div className='profile__info'>
					<div className='profile__box'>
						<label className='profile__label'>Имя</label>
						<input className='profile__input' type='text' id='name' name='name' placeholder='Имя' value={name} />
						<span className="profile__input-error input-name-error profile__error"></span>
					</div>
					<div className='profile__box'>
						<label className='profile__label'>Email</label>
						<input className='profile__input' type='email' id='email' name='email' placeholder='email' value={email} />
						<span className="profile__input-error input-name-error profile__error"></span>
					</div>
				</div>
				<div className='profile__buttons'>
					<button className='profile__button' type='button'>Редактировать</button>
					<button className='profile__button profile__button-exit' type='button'>Выйти из аккаунта</button>
				</div>
			</main>
		</>
	)
}

export default Profile;