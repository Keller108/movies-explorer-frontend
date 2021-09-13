class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
    }
}

export default new Api({
    baseUrl: 'https://api.movies108.nomoredomains.monster',
})