import React from "react";
import api, { API_ERROR } from "../api/api";
import { LoginForm } from "../components/LoginForm";
import { Credentials, Tokens } from "../types";

export const Login = () => {
  const [tokens, setTokens] = React.useState<Tokens>();

  const [shouldShowError, setShouldShowError] = React.useState(false);

  const handleLogin = async (credentials: Credentials) => {
    try {
      const tokens = await api.login(credentials);
      setTokens(tokens);
    } catch (err) {
      if (err instanceof Error && err.message === API_ERROR.UNAUTHORIZED) {
        setShouldShowError(true);
      }
    }
  };

  return (
    <div className="grid">
      <div></div>
      <article>
        {tokens ? (
          <div>You are logged in</div>
        ) : (
          <div>
            <LoginForm onSubmit={handleLogin} />
            {shouldShowError ? (
              <div>Email or password is not correct</div>
            ) : null}
          </div>
        )}
      </article>
      <div></div>
    </div>
  );
};
