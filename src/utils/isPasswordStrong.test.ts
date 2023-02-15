import { isPasswordStrong } from "./isPasswordStrong";

describe("isPasswordStrong:", () => {
  test("password is strong", () => {
    expect(isPasswordStrong("Pa$$w0rd")).toBe(true);
  });

  test("password is too short", () => {
    expect(isPasswordStrong("pwd123")).toBe(false);
  });

  test("password does not contain lowercase letters", () => {
    expect(isPasswordStrong("PASSWORD123!")).toBe(false);
  });

  test("password does not contain uppercase letters", () => {
    expect(isPasswordStrong("password123!")).toBe(false);
  });

  test("password does not contain numbers", () => {
    expect(isPasswordStrong("Password!")).toBe(false);
  });

  test("password does not contain symbols", () => {
    expect(isPasswordStrong("Password123")).toBe(false);
  });

  test("password contains only lowercase letters", () => {
    expect(isPasswordStrong("password")).toBe(false);
  });

  test("password contains only uppercase letters", () => {
    expect(isPasswordStrong("PASSWORD")).toBe(false);
  });

  test("password contains only numbers", () => {
    expect(isPasswordStrong("123456789")).toBe(false);
  });

  test("password contains only symbols", () => {
    expect(isPasswordStrong("!@#$%^&*()_+")).toBe(false);
  });
});

export {};
