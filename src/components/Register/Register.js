import './Register.css';
import Logo from '../Logo/Logo';
import { Link, withRouter } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import { useForm } from "react-hook-form";

function Register({ onRegisterUser, popup, popupText }) {

	const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

	function onSubmit(data) {
		onRegisterUser({
			name: data.name,
			email: data.email,
			password: data.password,
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
			<form className='register__form' id="register__form" name="register" onSubmit={handleSubmit(onSubmit)}>
				<div className='register__box'>
					<label className='register__label'>Имя</label>
					<input
						className='register__input'
						type='text'
						id='name'
						name='name'
						placeholder='Имя'
						required
						{...register('name', {
							required: true,
							minLength: 2,
							maxLength: 30,
							pattern: /[а-яa-z]/i,
						})}
						aria-invalid={errors.name ? "true" : "false"}
					/>
					<span className="register__input-error input-name-error register__error">
						{errors.name?.type === 'required' && 'Пожалуйста, заполните поле'}
						{errors.name?.type === 'minLength' && 'Имя должно быть не менее 2 символов'}
						{errors.name?.type === 'maxLength' && 'Имя должно быть не более 30 символов'}
						{errors.name?.type === 'pattern' && 'Недопустимые символы, пожалуйста, используйте только буквы'}
					</span>
				</div>
				<div className='register__box'>
					<label className='register__label'>E-mail</label>
					<input
						className='register__input'
						type='email'
						id='email'
						name='email'
						placeholder='email'
						required
						{...register('email', {
							required: true,
							validate: (input) => isEmail(input),
						})}
					/>
					<span className="register__input-error input-name-error register__error">
						{errors.email?.type === 'required' && 'Необходимо заполнить поле'}
						{errors.email?.type === 'validate' && 'Введите Email'}
					</span>
				</div>
				<div className='register__box'>
					<label className='register__label'>Пароль</label>
					<input
						className='register__input register__input-password'
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
					<span className="register__input-error input-name-error register__error">
						{errors.password?.type === 'required' && 'Необходимо заполнить поле'}
						{errors.password?.type === 'minLength' && 'Пароль содержит менее 6 символов, пожалуйста, измените на более сложный'}
						{errors.password?.type === 'pattern' && 'Пароль должен содержать цифры, а также строчные и заглавные буквы'}
					</span>
				</div>
			</form>
			<div className='register__buttons'>
				<button
					className='register__button'
					type='submit'
					form="register__form"
				>
					Зарегистрироваться
				</button>
				<p className='register__suggest-text'>Уже зарегистрированы?&nbsp;
					<Link to="/signin" className='register__suggest-button'>Войти</Link>
				</p>
			</div>
			<p className={`popupText ${popup && 'popupText_on'}`}>
				{popupText}
			</p>
		</main>
	)
}

export default withRouter(Register);