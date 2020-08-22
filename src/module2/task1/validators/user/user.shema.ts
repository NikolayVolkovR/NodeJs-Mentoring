export const userSchema = {
  properties: {
    login: {
      type: 'string',
    },
    password: {
      type: 'string',
      pattern: '(?=.*\\d)(?=.*[a-z])[a-z\\d]{6,}$',
      flags: 'gi',
      errorMessage: 'Password should be at least 6 characters and have digits and letters.',
    },
    age: {
      type: 'number',
      minimum: 4,
      maximum: 130,
      errorMessage: 'Age should be more than 4 and less than 131',
    },
  },
};

export const userCreateSchema = {
  required: ['login', 'password', 'age'],
  ...userSchema,
};

export const usersAutoSuggestSchema = {
  properties: {
    login: {
      type: 'string',
    },
    limit: {
      type: 'number',
    },
  },
};
