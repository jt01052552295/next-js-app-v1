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
