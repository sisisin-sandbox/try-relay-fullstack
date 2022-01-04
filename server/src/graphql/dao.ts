import users from '../data/users.json';
import fs from 'fs/promises';

const sleep = (timeout: number) => new Promise((done) => setTimeout(done, timeout));
const randomDelay = () => sleep(Math.random() * 2000);
export const userDao = new (class {
  async findById(id: string) {
    await randomDelay();
    return users.find((u) => u.id === id)!;
  }
  async findMany() {
    return users;
  }
})();
