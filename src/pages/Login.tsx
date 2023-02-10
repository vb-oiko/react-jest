import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Credentials } from "../types";

export const Login = () => {
  const [tokens, setTokens] = React.useState();

  const [shouldShowError, setShouldShowError] = React.useState(false);

  const handleLogin = async (credentials: Credentials) => {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      const tokens = await response.json();
      setTokens(tokens);
    }

    if (response.status === 401) {
      setShouldShowError(true);
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
