class MoviesApi {
	constructor(options) {
		this._baseURL = options.baseUrl;
		this._headers = options.headers;
	}

	getMovies() {
		return fetch(`${this._baseURL}`, {
			method: 'GET',
			headers: this._headers,
		})
			.then(this._checkResponseStatus)
	}

	_checkResponseStatus(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

}

const API_CONFIG = {
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
	headers: {
		'Content-Type': 'application/json'
	},
};

const moviesApi = new MoviesApi(API_CONFIG);

export default moviesApi;