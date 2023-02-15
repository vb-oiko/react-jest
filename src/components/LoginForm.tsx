import React from "react";
import { Credentials } from "../types";

export interface LoginFormProps {
  onSubmit: (credentials: Credentials) => void | Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [credentials, setCredentials] = React.useState({
    email: "", // "john@mail.com",
    password: "", // "changeme",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    const { name, value } = ev.target;
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [name]: value,
    }));
  };

  return (
    <>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={credentials.email}
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={credentials.password}
        />
      </label>

      <button type="button" onClick={() => onSubmit(credentials)}>
        Login
      </button>
    </>
  );
};
