interface SPSTokenParams {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: string | null;
}

export const saveUserToken = (data: string) => {
  localStorage.setItem("token", JSON.stringify(data));
};

export const getUserToken = () => {
  return JSON.parse(localStorage.getItem("token") as string);
};

export const saveSPSToken = () => {
  let str = window.location.href.replace("#", "?");
  let url = new URL(str);
  let params = new URLSearchParams(url.searchParams);

  const spsTokenParams = {
    accessToken: params.get("access_token"),
    tokenType: params.get("token_type"),
    expiresIn: params.get("expires_in"),
  };

  localStorage.setItem("spsTokenParams", JSON.stringify(spsTokenParams));
};

export const getSPSToken = () => {
  return JSON.parse(localStorage.getItem("spsTokenParams") as string) as SPSTokenParams;
};
