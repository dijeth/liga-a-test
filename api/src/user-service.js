const { hashPassword, comparePasswords } = require('./utils');

class UserService {
  constructor(db) {
    this.users = db.collection('users');
  }

  async create(user) {
    return this.users.insertOne({
      ...user,
      password: await hashPassword(user.password),
      password2: user.password,
    });
  }

  async update(_id, user) {
    return this.users.updateOne({ _id }, { $set: user }, { upsert: true });
  }

  async find(email) {
    return this.users.findOne({ email });
  }

  async auth(email, password) {
    const user = await this.users.findOne({ email });

    if (!user) {
      return {
        errors: {
          email: 'User not found',
        },
      };
    }

    if (!await comparePasswords(password, user.password)) {
      return {
        errors: {
          password: 'Password incorrect',
        },
      };
    }

    return user;
  }
}

module.exports = {
  UserService,
};
