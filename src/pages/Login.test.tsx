import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import api, { API_ERROR } from "../api/api";
import { translations } from "../translations";
import { Login } from "./Login";
import { Tokens } from "../types";

it("should render login form", () => {
  render(<Login />);

  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
});

const TOKENS: Tokens = {
  access_token: "some token",
  refresh_token: "some token 2",
};

const CREDENTIALS = {
  email: "valid@email.com",
  password: "valid password",
};

it("should login with proper credentials", async () => {
  const mockLogin = jest
    .spyOn(api, "login")
    .mockResolvedValue(Promise.resolve(TOKENS));

  render(<Login />);
  await userEvent.type(screen.getByLabelText("Email"), CREDENTIALS.email);
  await userEvent.type(screen.getByLabelText("Password"), CREDENTIALS.password);
  await userEvent.click(screen.getByText("Login"));

  expect(mockLogin).toHaveBeenCalledWith(CREDENTIALS);

  expect(
    await screen.findByText(translations.login_success)
  ).toBeInTheDocument();
});

it("should fail login with incorrect credentials", async () => {
  const mockLogin = jest
    .spyOn(api, "login")
    .mockResolvedValue(Promise.reject(new Error(API_ERROR.UNAUTHORIZED)));

  render(<Login />);
  await userEvent.type(screen.getByLabelText("Email"), CREDENTIALS.email);
  await userEvent.type(screen.getByLabelText("Password"), CREDENTIALS.password);
  await userEvent.click(screen.getByText("Login"));

  expect(mockLogin).toHaveBeenCalledWith(CREDENTIALS);

  expect(
    await screen.findByText(translations.login_failed)
  ).toBeInTheDocument();
});
