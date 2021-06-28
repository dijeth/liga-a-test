const EXIT_CODE_ERROR = 1;

const Role = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

const DEFAULT_USER = {
  role: Role.GUEST,
  name: 'Guest',
};

const PasswordLength = {
  MIN: 8,
  MAX: 50,
};

const NameLength = {
  MIN: 2,
  MAX: 50,
};

const BCRYPT_SALT = 10;

module.exports = {
  EXIT_CODE_ERROR,
  DEFAULT_USER,
  BCRYPT_SALT,
  Role,
  PasswordLength,
  NameLength,
};
