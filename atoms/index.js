import { atom, selector } from 'recoil';

export const newsState = atom({
  key: 'newsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
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
  default: [{ '02': '피자' }, { '03': '파스타&치킨' }, { '04': '사이드&음료' }], // default value (aka initial value)
});

export const category2State = atom({
  key: 'category2State', // unique ID (with respect to other atoms/selectors)
  default: [
    { '0202': '프리미엄' },
    { '0203': '마니아' },
    { '0204': '팬' },
    { '0205': '(씬)메가크런치' },
  ], // default value (aka initial value)
});
