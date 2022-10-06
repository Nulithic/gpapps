const saveUserToken = (data: string) => {
  localStorage.setItem("token", JSON.stringify(data));
};

const getUserToken = () => {
  return JSON.parse(localStorage.getItem("token")!!);
};

export { saveUserToken, getUserToken };
