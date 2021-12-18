export interface IUserRef {
  __typename: 'User';
  userId: string;
  languageId: string;
}

export interface ILanguageRef {
  __typename: 'Language';
  languageId: string;
}

// [ADD NEW REFERENCE TYPES ABOVE] <- DO NOT REMOVE - Needed for the generator to create refs types seamlessly
