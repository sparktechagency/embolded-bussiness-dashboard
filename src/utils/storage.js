export const saveToken = (token) => {
  localStorage.setItem("taken", token);
};

export const getToken = () => {
  return localStorage.getItem("taken");
};

export const removeToken = () => {
  localStorage.removeItem("taken");
};
