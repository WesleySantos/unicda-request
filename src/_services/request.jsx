import { authHeader } from '../_helpers';

export const requestService = {
  getAll,
  getById,
  update,
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`https://unicdarequests.herokuapp.com/api/request`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`https://unicdarequests.herokuapp.com/api/request/${id}`, requestOptions).then(handleResponse);
}

function update(id) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch(`https://unicdarequests.herokuapp.com/api/request/${id}`, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) console.log("Hola")

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}