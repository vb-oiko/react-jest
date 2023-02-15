export function isPasswordStrong(password: string) {
  const minLength = 8;
  //   const minLowercase = 1;
  //   const minUppercase = 1;
  //   const minNumbers = 1;
  //   const minSymbols = 1;

  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  if (password.length < minLength) {
    return false;
  }
  if (!lowercaseRegex.test(password)) {
    return false;
  }
  if (!uppercaseRegex.test(password)) {
    return false;
  }
  if (!numberRegex.test(password)) {
    return false;
  }
  if (!symbolRegex.test(password)) {
    return false;
  }

  return true;
}
