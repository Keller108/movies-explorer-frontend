class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
    }

    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(this._checkResponse)
    }

    updateInfo(userData) {
        const dataObject = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(userData),
        }
        return fetch(`${this._baseUrl}/users/me`, dataObject)
            .then(this._checkResponse)
    }
}

export default new Api({
    baseUrl: 'https://api.movies108.nomoredomains.monster',
})