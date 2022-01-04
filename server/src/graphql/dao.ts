import users from '../data/users.json';
import fs from 'fs/promises';

export const userDao = new (class {
  async findById(id: string) {
    return users.find((u) => u.id === id)!;
  }
  async findMany() {
    return users;
  }
})();
