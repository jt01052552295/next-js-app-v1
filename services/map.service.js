import getConfig from 'next/config';
import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/map`;

// const userSubject = new BehaviorSubject(
//   typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')),
// );

export const mapService = {
  // user: userSubject.asObservable(),
  // get userValue() {
  //   return userSubject.value;
  // },
  search,
};
function search(credentials) {
  const { keyword, page } = credentials;

  return fetchWrapper
    .get(`${baseUrl}/search?keyword=${encodeURIComponent(keyword)}&page=${page}`)
    .then((res) => {
      const user = res;
      //console.log('search - service', user);
      return user;
    });
}
