import { Route, Routes } from 'react-router-dom';
import { App } from './components/App/App';
import { Post } from './components/Post/Post';
import { CreatePost } from './components/PostForm/CreatePost';
import { Posts } from './components/Posts/Posts';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App></App>} />
      <Route path="/posts" element={<Posts></Posts>} />
      <Route path="/posts/:id" element={<Post></Post>} />
      <Route path="/posts/new" element={<CreatePost />} />
    </Routes>
  );
};
