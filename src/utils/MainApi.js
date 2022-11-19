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

	toggleSave(card, isSaved, isMineMovie) {
		if (!isSaved) {
			return fetch(`${this._baseURL}/movies`, {
				method: 'POST',
				headers: this._headers,
				credentials: this._credentials,
				body: JSON.stringify({
					country: card.country,
					director: card.director,
					duration: card.duration,
					year: card.year,
					description: card.description,
					image: `https://api.nomoreparties.co${card.image.url}`,
					nameRU: card.nameRU,
					nameEN: card.nameEN,
					trailerLink: card.trailerLink,
					thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
					movieId: card.id
				})
			})
				.then(this._checkResponseStatus)
		} else {
			console.log('удаляю card._id', card._id);
			return fetch(`${this._baseURL}/movies/${card._id}`, {
				method: 'DELETE',
				headers: this._headers,
				credentials: this._credentials,
			})
				.then(this._checkResponseStatus)
		}
	}

	saveMovie(card) {
		return fetch(`${this._baseURL}/movies`, {
			method: 'POST',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify({
				country: card.country,
				director: card.director,
				duration: card.duration,
				year: card.year,
				description: card.description,
				image: `https://api.nomoreparties.co${card.image.url}`,
				nameRU: card.nameRU,
				nameEN: card.nameEN,
				trailerLink: card.trailerLink,
				thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
				movieId: card.id
			}),
		}).then((res) => {
			return this._checkResponseStatus(res);
		});
	}

	deleteMovie(movie) {
		console.log('удаляю id', movie._id);
		return fetch(`${this._baseURL}/movies/${movie._id}`, {
			method: 'DELETE',
			headers: this._headers,
			credentials: this._credentials,
		}).then((res) => {
			return this._checkResponseStatus(res);
		});
	}

	_checkResponseStatus(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}
}

const API_CONFIG = {
	// baseUrl: 'https://api.dmitryzhur-movies.nomoredomains.icu',
	baseUrl: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'include',
};

const mainApi = new MainApi(API_CONFIG);

export default mainApi;