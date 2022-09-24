import getConfig from 'next/config';
import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

const userSubject = new BehaviorSubject(
  typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')),
);

export const signInService = {
  // user: userSubject.asObservable(),
  // get userValue() {
  //   return userSubject.value;
  // },
  login,
  // logout,
  // getAll,
};
function login(email, password) {
  const credentials = { email, password };
  return fetchWrapper.post(`${baseUrl}/authenticate`, credentials).then((res) => {
    console.log('sigin.in.service');
    const user = res.data;
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/');
}
