/* eslint-disable no-param-reassign */
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

import helpers from "../helpers.js";
import { users } from "../config/mongoCollections.js";

const pwrounds = 16;

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  const errorMessages = {};

  try {
    firstName = helpers.checkFirstNameLastName(firstName, "First Name");
  } catch (e) {
    errorMessages.firstName = e.message;
  }
  try {
    lastName = helpers.checkFirstNameLastName(lastName, "Last Name");
  } catch (e) {
    errorMessages.lastName = e.message;
  }
  try {
    emailAddress = helpers.checkEmailAddress(emailAddress, "Email Address");
  } catch (e) {
    errorMessages.emailAddressInput = e.message;
  }
  try {
    password = helpers.checkPassword(password, "Password");
  } catch (e) {
    errorMessages.passwordInput = e.message;
  }
  try {
    role = helpers.checkRole(role, "Role");
  } catch (e) {
    errorMessages.role = e.message;
  }
  if (Object.keys(errorMessages).length > 0) {
    errorMessages.status = 400;
    throw errorMessages;
  }
  const usersCollection = await users();
  const existEmail = await usersCollection.findOne({ emailAddress });
  if (existEmail) {
    const error = Error("Already a user registered with that email");
    error.status = 400;
    throw error;
  }

  const hashedPw = await bcrypt.hash(password, pwrounds);

  const newUser = {
    _id: new ObjectId(),
    firstName,
    lastName,
    emailAddress,
    password: hashedPw,
    role,
  };
  const insertUser = await usersCollection.insertOne(newUser);
  if (insertUser.insertedCount === 0) {
    const error = Error("insertion of user failed");
    error.status = 500;
    throw error;
  }
  return { insertedUser: true };
};

export const checkUser = async (emailAddress, password) => {
  const errorMessages = {};
  try {
    emailAddress = helpers.checkEmailAddress(emailAddress, "Email Address");
  } catch (e) {
    errorMessages.emailAddressInput = e.message;
  }
  try {
    password = helpers.checkPassword(password, "Password");
  } catch (e) {
    errorMessages.passwordInput = e.message;
  }

  if (Object.keys(errorMessages).length > 0) {
    errorMessages.status = 400;
    throw errorMessages;
  }

  const usersCollection = await users();
  const user = await usersCollection.findOne({ emailAddress });
  if (!user) {
    const error = Error("Either the email address or password is invalid");
    error.status = 400;
    throw error;
  }
  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    const error = Error("Either the email address or password is invalid");
    error.status = 400;
    throw error;
  }
  delete user.passwordInput;
  delete user._id;
  return user;
};
