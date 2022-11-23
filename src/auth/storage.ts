import addSeconds from "date-fns/addSeconds";

interface SPSTokenParams {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: string | null;
  state: string | null;
}

export const saveUserToken = (data: string) => {
  localStorage.setItem("token", JSON.stringify(data));
};

export const getUserToken = () => {
  return JSON.parse(localStorage.getItem("token") as string);
};

export const saveSPSToken = () => {
  const str = window.location.href.replace("#", "?");
  const url = new URL(str);
  const params = new URLSearchParams(url.searchParams);
  console.log([...params].length);

  if ([...params].length > 0) {
    const expiresInSec = parseInt(params.get("expires_in")!!);
    const expiresInDate = addSeconds(new Date(), expiresInSec);

    const tokenParams = {
      accessToken: params.get("access_token"),
      tokenType: params.get("token_type"),
      expiresIn: expiresInDate.toISOString(),
      state: params.get("state"),
    };
    localStorage.setItem("spsTokenParams", JSON.stringify(tokenParams));
  }
};

export const getSPSToken = () => {
  return JSON.parse(localStorage.getItem("spsTokenParams") as string) as SPSTokenParams;
};

export const getRedirectUri = () => {
  return localStorage.getItem("redirectUri");
};
