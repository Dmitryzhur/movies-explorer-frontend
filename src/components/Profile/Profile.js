import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import './Profile.css';
import Header from '../Header/Header';
import isEmail from "validator/lib/isEmail";
import { useForm } from "react-hook-form";

function Profile(props) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState(currentUser.name);
	const [email, setEmail] = useState(currentUser.email);

	const { register, formState: { errors, isValid }, handleSubmit } = useForm({mode: 'onChange'});

 function handleSubmitChanges(data) {
    if (data.name !== currentUser.name || data.email !== currentUser.email) {
      props.onSubmit({
        name: data.name,
        email: data.email,
      })
    } else {
      return !isValid;
    }
  }

	return (
		<>
			<Header loggedIn={props.loggedIn} />
			<main className='profile'>
				<div className='profile__greeting'>
					<h2 className='profile__title'>Привет, {name}!</h2>
				</div>
				<form className='profile__info' id="profile__form" noValidate onSubmit={handleSubmit(handleSubmitChanges)}>
					<div className='profile__box'>
						<label className='profile__label'>Имя</label>
						<input
							className='profile__input'
							type='text'
							id='name'
							name='name'
							placeholder='Имя'
							{...register('name', {
								value: currentUser.name,
								minLength: 2,
								maxLength: 30,
								pattern: /[а-яa-z]/i,
							})}
						/>
						<span className="profile__input-error input-name-error profile__error">
						{errors.name?.type === 'minLength' && 'Имя должно быть не менее 2 символов'}
						{errors.name?.type === 'maxLength' && 'Имя должно быть не более 30 символов'}
						{errors.name?.type === 'pattern' && 'Недопустимые символы, пожалуйста, используйте только буквы'}
						</span>
					</div>
					<div className='profile__box'>
						<label className='profile__label'>Email</label>
						<input
							className='profile__input'
							type='email'
							id='email'
							name='email'
							placeholder='email'
							{...register('email', {
								value: currentUser.email,
								validate: (input) => isEmail(input),
							})}
						/>
						<span className="profile__input-error input-name-error profile__error">
						{errors.email?.type === 'validate' && 'Введите Email'}
						</span>
					</div>
				</form>
				<div className='profile__buttons'>
					<button
						disabled={!isValid}
						className={`profile__button ${!isValid ? 'profile__button_disabled' : ''}`}
						type='submit'
						form="profile__form"

						
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