import getConfig from 'next/config';
import { signInService } from '../services';
const { publicRuntimeConfig } = getConfig();

import { axios } from '../libraries';

export const fetchWrapper = {
  post,
};

function post(url, body) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
  };
  //   console.log('post', requestOptions);
  //   console.log('post', url, body);

  return axios.post(url, body, requestOptions).then((res) => {
    return res.data;
  });
}

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = signInService.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && signInService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //   signInService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
