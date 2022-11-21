import { BASE_URL } from './constants.js';
class Auth {
	constructor(options) {
		this._baseURL = options.baseUrl;
		this._headers = options.headers;
		this._credentials = options.credentials;
	}

	register(data) {
		return fetch(`${this._baseURL}/signup`, {
			method: 'POST',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify(data)
		})
			.then(this._checkResponseStatus)
	}

	authorize(data) {
		return fetch(`${this._baseURL}/signin`, {
			method: 'POST',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify(data)
		})
			.then(this._checkResponseStatus)
	}

	logout() {
		return fetch(`${this._baseURL}/logout`, {
			method: 'GET',
			headers: this._headers,
			credentials: this._credentials,
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

const AUTH_CONFIG = {
	baseUrl: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'include',
};

const auth = new Auth(AUTH_CONFIG);

export default auth;