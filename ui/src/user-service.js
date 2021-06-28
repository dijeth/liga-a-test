import { API_URL } from './const';

class UserService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(path, method = 'GET', data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    if ((method !== 'GET' || method !== 'HEAD') && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}/${path}`, options)
      .then((res) => res.json());

    if (response.errors) {
      return {
        errors: {
          ...response.errors,
          old: data,
        },
      };
    }

    return response;
  }

  async auth() {
    return this.request('auth', 'GET');
  }

  async logout() {
    return this.request('logout', 'GET');
  }

  async login({ email, password }) {
    return this.request('auth', 'POST', { email, password });
  }

  async register({
    name, lastname, role, email, password, passwordRepeat,
  }) {
    return this.request('user', 'POST', {
      name, lastname, role, email, password, passwordRepeat,
    });
  }
}

const userService = new UserService(API_URL);

export {
  UserService,
  userService,
};
