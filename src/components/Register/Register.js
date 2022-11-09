import './Register.css';
import Logo from '../Logo/Logo';

function Register() {
	return (
		<section className="register">
		<div className='register__container'>
			<div className='register__logo'>
				<Logo />
			</div>
			<div className='register__greeting'>
				<h2 className='register__title'>Добро пожаловать!</h2>
			</div>
			<form className='register__form'>
				<div className='register__box'>
					<label className='register__label'>Имя</label>
					<input className='register__input' type='text' id='name' name='name' placeholder='Имя' value='Виталий' />
					<span className="register__input-error input-name-error register__error"></span>
				</div>
				<div className='register__box'>
					<label className='register__label'>E-mail</label>
					<input className='register__input' type='email' id='email' name='email' placeholder='email' value='pochta@yandex.ru|' />
					<span className="register__input-error input-name-error register__error"></span>
				</div>
				<div className='register__box'>
					<label className='register__label'>Пароль</label>
					<input className='register__input register__input-password' type='password' id='password' name='password' placeholder='password' value='••••••••••••••' />
					<span className="register__input-error input-name-error register__error">Что-то пошло не так...</span>
				</div>
			</form>
			<div className='register__buttons'>
				<button className='register__button' type='submit'>Зарегистрироваться</button>
				<p className='register__suggest-text'>Уже зарегистрированы?&nbsp;
					<button className='register__suggest-button' type='submit'>Войти</button>
				</p>
			</div>
		</div>
	</section>
	)
}

export default Register;