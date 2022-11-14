import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

function Login() {
	return (
		<main className="login">
			<div className='login__logo'>
				<Logo />
			</div>
			<div className='login__greeting'>
				<h2 className='login__title'>Рады видеть!</h2>
			</div>
			<form className='login__form'>
				<div className='login__box'>
					<label className='login__label'>E-mail</label>
					<input className='login__input' type='email' id='email' name='email' placeholder='email' value='pochta@yandex.ru|' />
					<span className="login__input-error input-name-error login__error"></span>
				</div>
				<div className='login__box'>
					<label className='login__label'>Пароль</label>
					<input className='login__input login__input-password' type='password' id='password' name='password' placeholder='password' />
					<span className="login__input-error input-name-error login__error"></span>
				</div>
			</form>
			<div className='login__buttons'>
				<button className='login__button' type='submit'>Войти</button>
				<p className='login__suggest-text'>Ещё не зарегистрированы?&nbsp;
					<Link to="/signup" className='login__suggest-button' type='submit'>Регистрация</Link>
				</p>
			</div>
		</main>
	)
}

export default Login;