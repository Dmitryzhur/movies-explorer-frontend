import { useState } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

function Register({ onRegisterUser }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	function handleChangeName(e) {
		setName(e.target.value)
	}

	function handleChangeEmail(e) {
		setEmail(e.target.value)
	}

	function handleChangePassword(e) {
		setPassword(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault();
		onRegisterUser({
			name,
			email,
			password
		});
	}

	return (
		<main className="register">
			<div className='register__logo'>
				<Logo />
			</div>
			<div className='register__greeting'>
				<h2 className='register__title'>Добро пожаловать!</h2>
			</div>
			<form className='register__form' id="register__form" onSubmit={handleSubmit}>
				<div className='register__box'>
					<label className='register__label'>Имя</label>
					<input
						className='register__input'
						type='text'
						id='name'
						name='name'
						placeholder='Имя'
						onChange={handleChangeName}
						value={name}
						required
					/>
					<span className="register__input-error input-name-error register__error"></span>
				</div>
				<div className='register__box'>
					<label className='register__label'>E-mail</label>
					<input
						className='register__input'
						type='email'
						id='email'
						name='email'
						placeholder='email'
						onChange={handleChangeEmail}
						value={email}
						required
					/>
					<span className="register__input-error input-name-error register__error"></span>
				</div>
				<div className='register__box'>
					<label className='register__label'>Пароль</label>
					<input
						className='register__input register__input-password'
						type='password'
						id='password'
						ame='password'
						placeholder='password'
						onChange={handleChangePassword}
						value={password}
						required
					/>
					<span className="register__input-error input-name-error register__error"></span>
				</div>
			</form>
			<div className='register__buttons'>
				<button
					className='register__button'
					type='submit'
					form="register__form"
					onSubmit={handleSubmit}
				>
					Зарегистрироваться
				</button>
				<p className='register__suggest-text'>Уже зарегистрированы?&nbsp;
					<Link to="/signin" className='register__suggest-button'>Войти</Link>
				</p>
			</div>
		</main >
	)
}

export default Register;