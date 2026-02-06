const USERNAME_KEY = 'codeleap_username';

export const getUsername = () => {
  return localStorage.getItem(USERNAME_KEY);
};

export const setUsername = (username) => {
  localStorage.setItem(USERNAME_KEY, username);
};

export const clearUsername = () => {
  localStorage.removeItem(USERNAME_KEY);
};
