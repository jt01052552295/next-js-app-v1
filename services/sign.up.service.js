import getConfig from 'next/config';
import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';

import { signInService } from './sign.in.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

// const userSubject = new BehaviorSubject(
//   typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')),
// );

export const signUpService = {
  // user: userSubject.asObservable(),
  // get userValue() {
  //   return userSubject.value;
  // },
  signUp,
};
function signUp(credentials) {
  return fetchWrapper.post(`${baseUrl}/signup`, credentials).then((res) => {
    console.log('sigin.up.service');
    const user = res;
    // console.log(res);
    if (user.success) {
      // userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  });
}
