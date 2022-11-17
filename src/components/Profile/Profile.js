import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState(currentUser.name);
	const [email, setEmail] = useState(currentUser.email);

	function handleChangeName(e) {
		setName(e.target.value);
	}

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleSubmitChanges(e) {
		e.preventDefault();
		props.onSubmit({
			name,
			email
		});
	}

	return (
		<>
			<Header loggedIn={props.loggedIn} />
			<main className='profile'>
				<div className='profile__greeting'>
					<h2 className='profile__title'>Привет, {name}!</h2>
				</div>
				<form className='profile__info' id="profile__form" noValidate>
					<div className='profile__box'>
						<label className='profile__label'>Имя</label>
						<input
							className='profile__input'
							type='text'
							id='name'
							name='name'
							placeholder='Имя'
							value={name}
							onChange={handleChangeName}
						/>
						<span className="profile__input-error input-name-error profile__error"></span>
					</div>
					<div className='profile__box'>
						<label className='profile__label'>Email</label>
						<input
							className='profile__input'
							type='email'
							id='email'
							name='email'
							placeholder='email'
							value={email}
							onChange={handleChangeEmail}
						/>
						<span className="profile__input-error input-name-error profile__error"></span>
					</div>
				</form>
				<div className='profile__buttons'>
					<button
						className='profile__button'
						type='submit'
						form="profile__form"
						onClick={handleSubmitChanges}
					>
						Редактировать
					</button>
					<button
						className='profile__button profile__button-exit'
						type='button'
						onClick={props.onLogout}
					>
						Выйти из аккаунта
					</button>
				</div>
			</main>
		</>
	)
}

export default Profile;