const apiUrl = 'https://southamerica-east1-teste-functions-d849f.cloudfunctions.net/tcc_functions';

const post = async (url, body) => {
  return new Promise((res, rej) => {
    fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then(data => res(data.json()))
      .catch(error => rej(error))
  });
};

const get = async (url) => {
  return new Promise((res, rej) => {
    fetch(`${apiUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(data => res(data.json()))
      .catch(error => rej(error))
  });
};

const remove = async (url) => {
  return new Promise((res, rej) => {
    fetch(`${apiUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(data => res(data.json()))
      .catch(error => rej(error))
  });
}

export {
  post,
  get,
  remove
};