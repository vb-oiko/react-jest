import React from "react";
import api, { API_ERROR } from "../api/api";
import { LoginForm } from "../components/LoginForm";
import { translations } from "../translations";
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
          <div>{translations.login_success}</div>
        ) : (
          <div>
            <LoginForm onSubmit={handleLogin} />
            {shouldShowError ? <div>{translations.login_failed}</div> : null}
          </div>
        )}
      </article>
      <div></div>
    </div>
  );
};
