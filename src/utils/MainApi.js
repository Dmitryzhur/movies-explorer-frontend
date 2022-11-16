class MainApi {
	constructor(options) {
		this._baseURL = options.baseUrl;
		this._headers = options.headers;
		this._credentials = options.credentials;
	}

	getMovies() {
		return fetch(`${this._baseURL}/movies`, {
			method: 'GET',
			headers: this._headers,
			credentials: this._credentials,
		})
			.then(this._checkResponseStatus)
	}

	getUser() {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'GET',
			headers: this._headers,
			credentials: this._credentials,
		})
			.then(this._checkResponseStatus)
	}

	toggleSave(_id, isSaved) {
		if (!isSaved) {
			return fetch(`${this._baseURL}/movies/${_id}`, {
				method: 'PUT',
				headers: this._headers,
				credentials: this._credentials,
			})
				.then(this._checkResponseStatus)
		} else {
			return fetch(`${this._baseURL}/movies/${_id}`, {
				method: 'DELETE',
				headers: this._headers,
				credentials: this._credentials,
			})
				.then(this._checkResponseStatus)
		}
	}

	editProfile(data) {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			credentials: this._credentials,
			body: JSON.stringify(data)
		},
		)
			.then(this._checkResponseStatus)
	}

	register(data) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(data)
		})
			.then(this._checkResponseStatus)
	}

	authorize(data) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(data),
			credentials: this._credentials,
		})
			.then(this._checkResponseStatus)
	}

	getContent(jwt) {
		return fetch(`${this._baseURL}/users/me`, {
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${jwt}`,
				"Content-Type": "application/json"
			}
		})
			.then(this._checkResponseStatus)
	}

	logout() {
    return fetch(`${this._baseUrl}/signout`, {
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

const API_CONFIG = {
	baseUrl: 'http://localhost:3000',
	headers: {
		authorization: '5ae85ff0-6a9f-41ff-87d1-d1c4768e29ea',
		'Content-Type': 'application/json'
	},
	credentials: 'include',
};

const mainApi = new MainApi(API_CONFIG);

export default mainApi;