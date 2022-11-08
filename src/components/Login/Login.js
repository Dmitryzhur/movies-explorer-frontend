import Header from '../Header/Header';

function Login() {
	const loggedIn = false;

	return (
		<section className="login">
				<Header loggedIn={loggedIn}/>
		</section>
	)
}

export default Login;