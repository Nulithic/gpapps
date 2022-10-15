export const saveUserToken = (data: string) => {
  localStorage.setItem("token", JSON.stringify(data));
};

export const getUserToken = () => {
  return JSON.parse(localStorage.getItem("token")!!);
};
