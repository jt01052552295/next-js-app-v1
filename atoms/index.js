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
