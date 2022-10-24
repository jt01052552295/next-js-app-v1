import getConfig from 'next/config';
import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';

import { signUpService } from './sign.up.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

const userSubject = new BehaviorSubject(
  typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')),
);

export const signInService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
};
function login(email, password) {
  const credentials = { email, password };
  return fetchWrapper.post(`${baseUrl}/authenticate`, credentials).then((res) => {
    console.log('sigin.in.service');
    const user = res;
    console.log(user.success);
    if (user.success) {
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  // console.log(signInService.userValue, signUpService.userValue);

  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/');
}
