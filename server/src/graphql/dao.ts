import users from '../data/users.json';
import posts from '../data/posts.json';
import fs from 'fs/promises';
import path from 'path';
const data = path.resolve(__dirname, '../data');

const sleep = (timeout: number) => new Promise((done) => setTimeout(done, timeout));
const randomDelay = () => sleep(Math.random() * 2000);

export type User = {
  id: string;
  name: string;
};
export const userDao = new (class {
  async findById(id: string): Promise<User> {
    await randomDelay();
    return users.find((u) => u.id === id)!;
  }
  async findMany() {
    return users;
  }
  async create(name: string) {
    return { id: '1', name };
  }
})();

type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
};
export const postDao = new (class {
  async findById(id: string): Promise<Post> {
    await randomDelay();
    return posts.find((p) => p.id === id)!;
  }
  async findMany(): Promise<Post[]> {
    return posts;
  }
  async create(authorId: string, title: string, body: string): Promise<Post> {
    const post = {
      id: (+posts[posts.length - 1].id + 1).toString(),
      userId: authorId,
      title,
      body,
    };
    const newPosts = [...posts, post];
    console.log(newPosts);
    await fs.writeFile(path.resolve(data, 'posts.json'), JSON.stringify(newPosts, null, 2));
    return post;
  }
})();
