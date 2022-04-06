import { Route, Routes } from 'react-router-dom';
import { App } from './components/App/App';
import { Post } from './components/Post/Post';
import { Posts } from './components/Posts/Posts';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App></App>} />
      <Route path="/posts" element={<Posts></Posts>} />
      <Route path="/posts/:id" element={<Post></Post>} />
    </Routes>
  );
};
