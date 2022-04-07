import fs from 'fs/promises';
import path from 'path';
const dataPath = path.resolve(__dirname, '../data');
const seedsPath = path.resolve(__dirname, '../seeds');

const tables = ['users', 'posts'] as const;
const db = new (class {
  private getByName(name: string) {
    const data = path.resolve(dataPath, `${name}.json`);
    return fs.readFile(data).then((data) => JSON.parse(data.toString()));
  }
  users(): Promise<User[]> {
    return this.getByName('users');
  }
  posts(): Promise<Post[]> {
    return this.getByName('posts');
  }
})();
export const initDb = async () => {
  for (const table of tables) {
    const name = `${table}.json`;
    const data = path.resolve(dataPath, name);
    const seed = path.resolve(seedsPath, name);
    await fs.stat(data).then(
      () => {},
      () => fs.copyFile(seed, data),
    );
  }
};

const sleep = (timeout: number) => new Promise((done) => setTimeout(done, timeout));
const randomDelay = () => sleep(Math.random() * 2000);

export type User = {
  id: string;
  name: string;
};
export const userDao = new (class {
  async findById(id: string): Promise<User> {
    return (await db.users()).find((u) => u.id === id)!;
  }
  async findMany() {
    return db.users;
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
    return (await db.posts()).find((p) => p.id === id)!;
  }
  async findMany(): Promise<Post[]> {
    return db.posts();
  }
  async create(authorId: string, title: string, body: string): Promise<Post> {
    const posts = await db.posts();
    const post = {
      id: (+posts[posts.length - 1].id + 1).toString(),
      userId: authorId,
      title,
      body,
    };
    const newPosts = [...posts, post];
    await fs.writeFile(path.resolve(dataPath, 'posts.json'), JSON.stringify(newPosts, null, 2));
    return post;
  }
  async delete(authorId: string, postId: string): Promise<string | null> {
    const posts = await db.posts();
    const target = posts.find((p) => p.id === postId);
    if (!target) {
      return null;
    }
    if (target.userId !== authorId) {
      throw new Error(`Invalid operation. postId: ${postId} is not yours.`);
    }

    const newPosts = posts.filter((p) => p.id !== postId);
    await fs.writeFile(path.resolve(dataPath, 'posts.json'), JSON.stringify(newPosts, null, 2));
    return postId;
  }
})();
