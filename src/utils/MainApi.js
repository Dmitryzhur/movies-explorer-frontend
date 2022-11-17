class MainApi {
	constructor(options) {
		this._baseURL = options.baseUrl;
		this._headers = options.headers;
		this._credentials = options.credentials;
	}

	getUser() {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'GET',
			headers: this._headers,
			credentials: this._credentials,
		})
			.then(this._checkResponseStatus)
	}

	editProfile(data) {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify({
				name: data.name,
				email: data.email,
			})
		},
		)
			.then(this._checkResponseStatus)
	}

	getMovies() {
		return fetch(`${this._baseURL}/movies`, {
			method: 'GET',
			headers: this._headers,
			credentials: this._credentials,
		})
			.then(this._checkResponseStatus)
	}

	toggleSave(movie, isSaved) {
		if (!isSaved) {
			return fetch(`${this._baseURL}/movies/`, {
				method: 'POST',
				headers: this._headers,
				credentials: this._credentials,
				body: JSON.stringify(movie)
			})
				.then(this._checkResponseStatus)
		} else {
			return fetch(`${this._baseURL}/movies/${movie._id}`, {
				method: 'DELETE',
				headers: this._headers,
				credentials: this._credentials,
			})
				.then(this._checkResponseStatus)
		}
	}

	_checkResponseStatus(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}
}

const API_CONFIG = {
	// baseUrl: 'https://api.dmitryzhur-movies.nomoredomains.icu/',
	baseUrl: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'include',
};

const mainApi = new MainApi(API_CONFIG);

export default mainApi;