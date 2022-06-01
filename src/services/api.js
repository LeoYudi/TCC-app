const apiUrl = 'https://southamerica-east1-teste-functions-d849f.cloudfunctions.net/tcc_functions';

const postRequest = async (url, body) => {
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

export {
  postRequest
};