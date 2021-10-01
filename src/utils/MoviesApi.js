export const baseUrl = 'https://api.movies108.nomoredomains.monster';

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export const register = (name, email, password) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    })
      .then(handleResponse)
  };
  
  export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
      .then(handleResponse)
  };
  
  export const getContent = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(handleResponse)
  };

export const getInfo = () => {
    const dataObj = {
        method: 'GET',
        headers: {
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

export const saveMovie = ({movie}) => {
    return fetch(`${baseUrl}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailer: movie.trailer,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }),
    })
    .then(handleResponse);
};

export const deleteMovie = ({id}) => {
  return fetch(`${baseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }).then(handleResponse);
};

export const getSavedMovies = () => {
  return fetch(`${baseUrl}/movies`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }).then(handleResponse);
}