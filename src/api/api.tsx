import { Credentials, Tokens } from "../types";

export const API_ERROR = {
  UNAUTHORIZED: "unauthorized",
};

const login = async (credentials: Credentials) => {
  return new Promise<Tokens>(async (resolve, reject) => {
    const response = await window.fetch(
      "https://api.escuelajs.co/api/v1/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const tokens = await response.json();
      resolve(tokens);
    }

    if (response.status === 401) {
      reject(new Error(API_ERROR.UNAUTHORIZED));
    }
  });
};

const api = { login ,
//logout
};

export default api;
