import bcrypt from "bcrypt";

export const generatePassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const validatePassword = async (
  enteredPassword: string,
  userPassword: string
) => {
  const isValid = await bcrypt.compare(enteredPassword, userPassword);

  return isValid;
};
