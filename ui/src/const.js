const Role = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

const DEFAULT_USER = {
  role: Role.GUEST,
};

const API_URL = 'http://localhost:3000/api';

export {
  Role,
  DEFAULT_USER,
  API_URL,
};
