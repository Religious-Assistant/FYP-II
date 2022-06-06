import { BASE_URL } from "./ServiceConstants";

async function loginUser(credentials) {

  return fetch(`${BASE_URL}/loginUser`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
}

async function registerUser(data) {

  return fetch(`${BASE_URL}/registerUser`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

}

export {loginUser, registerUser}