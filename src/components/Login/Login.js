import { useState } from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

function Login({ onLoginUser }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleChangeEmail(e) {
		setEmail(e.target.value)
	}

	function handleChangePassword(e) {
		setPassword(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault();
		onLoginUser({
			email,
			password
		});
	}

	return (
		<main className="login">
			<div className='login__logo'>
				<Logo />
			</div>
			<div className='login__greeting'>
				<h2 className='login__title'>Рады видеть!</h2>
			</div>
			<form className='login__form' id="login__form" onSubmit={handleSubmit}>
				<div className='login__box'>
					<label className='login__label'>E-mail</label>
					<input
						className='login__input'
						type='email'
						id='email'
						name='email'
						placeholder='email'
						onChange={handleChangeEmail}
						value={email}
						required
					/>
					<span className="login__input-error input-name-error login__error"></span>
				</div>
				<div className='login__box'>
					<label className='login__label'>Пароль</label>
					<input
						className='login__input login__input-password'
						type='password'
						id='password'
						name='password'
						placeholder='password'
						onChange={handleChangePassword}
						value={password}
						required
					/>
					<span className="login__input-error input-name-error login__error"></span>
				</div>
			</form>
			<div className='login__buttons'>
				<button
					className='login__button'
					type='submit'
					onSubmit={handleSubmit}
					form="login__form"
				>
					Войти
				</button>
				<p className='login__suggest-text'>Ещё не зарегистрированы?&nbsp;
					<Link to="/signup" className='login__suggest-button'>Регистрация</Link>
				</p>
			</div>
		</main>
	)
}

export default Login;