export const baseUrl = 'https://api.movies108.nomoredomains.monster';

const handleResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)

export const getInfo = () => {
    const dataObj = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    }
    return fetch(`${baseUrl}/users/me`, dataObj)
        .then(handleResponse)
}

export const updateInfo = (userData) => {
    const dataObject = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(userData),
    }
    return fetch(`${baseUrl}/users/me`, dataObject)
        .then(handleResponse)
}