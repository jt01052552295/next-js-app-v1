import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

//1. 아무것도 설정 안 하고 쓰는 경우
//localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
// const { persistAtom } = recoilPersist();

//2. sessionStorage에 저장하고 싶은 경우
//Next.js를 쓴다면 sessionStorage는 아래와 같이 따로 설정 필요
const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'newsPersistState',
  storage: sessionStorage,
});

export const newsState = atom({
  key: 'newsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export const newsSelector = selector({
  key: 'newsSelector', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const news = get(newsState);
    return news;
  },
});

export const usersState = atom({
  key: 'usersState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const usersSelector = selector({
  key: 'usersSelector', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const users = get(usersState);
    return users;
  },
});

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

export const addressState = atom({
  key: 'addressState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const productState = atom({
  key: 'productState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const category1State = atom({
  key: 'category1State', // unique ID (with respect to other atoms/selectors)
  default: [
    ['02', '피자'],
    ['03', '파스타&치킨'],
    ['04', '사이드&음료'],
  ], // default value (aka initial value)
});

export const category2State = atom({
  key: 'category2State', // unique ID (with respect to other atoms/selectors)
  default: [
    ['0202', '프리미엄'],
    ['0203', '마니아'],
    ['0204', '팬'],
    ['0205', '(씬)메가크런치'],
  ], // default value (aka initial value)
});
