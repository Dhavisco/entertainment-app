// src/utils/validationSchemas.ts
import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Can't be empty"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Can't be empty"),
});

export const signupSchema = Yup.object({
  firstName: Yup.string()
    .required("Can't be empty"),
  lastName: Yup.string()
  .required("Can't be empty"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Can't be empty"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Can't be empty"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
