import './Login.css';
import Logo from '../Logo/Logo';
import { Link, withRouter } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import { useForm } from "react-hook-form";

function Login({ onLoginUser, popup, popupText }) {
	const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

	function onSubmit(data) {
		onLoginUser({
			email: data.email,
			password: data.password,
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
			<form className='login__form' id="login__form" name="login" onSubmit={handleSubmit(onSubmit)}>
				<div className='login__box'>
					<label className='login__label'>E-mail</label>
					<input
						className='login__input'
						type='email'
						id='email'
						name='email'
						placeholder='email'
						required
						{...register('email', {
							required: true,
							validate: (input) => isEmail(input),
						})}
						aria-invalid={errors.email ? "true" : "false"}
					/>
					<span className="login__input-error input-name-error login__error">
						{errors.email?.type === 'required' && 'Необходимо заполнить поле'}
						{errors.email?.type === 'validate' && 'Введите Email'}
					</span>
				</div>
				<div className='login__box'>
					<label className='login__label'>Пароль</label>
					<input
						className='login__input login__input-password'
						type='password'
						id='password'
						name='password'
						placeholder='password'
						required
						{...register('password', {
							required: true,
							minLength: 6,
							pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g,
						})}
					/>
					<span className="login__input-error input-name-error login__error">
						{errors.password?.type === 'required' && 'Необходимо заполнить поле'}
						{errors.password?.type === 'minLength' && 'Пароль содержит менее 6 символов, пожалуйста, измените на более сложный'}
						{errors.password?.type === 'pattern' && 'Пароль должен содержать цифры, а также строчные и заглавные буквы'}
					</span>
				</div>
			</form>
			<div className='login__buttons'>
				<button
					className='login__button'
					type='submit'
					form="login__form"
				>
					Войти
				</button>
				<p className='login__suggest-text'>Ещё не зарегистрированы?&nbsp;
					<Link to="/signup" className='login__suggest-button'>Регистрация</Link>
				</p>
			</div>
			<p className={`popupText ${popup && 'popupText_on'}`}>
				{popupText}
			</p>
		</main>
	)
}

export default withRouter(Login);