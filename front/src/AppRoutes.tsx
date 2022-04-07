import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from './components/App/App';
import { Links } from './components/Links';
import { Post } from './components/Post/Post';
import { CreatePost } from './components/PostForm/CreatePost';
import { Posts } from './components/Posts/Posts';

type State = { error: { message: string } | null };
class Boundary extends React.Component {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <pre>{this.state.error.message}</pre>;
    }

    return this.props.children;
  }
}

export const AppRoutes = () => {
  return (
    <div>
      <div>
        <Boundary>
          <React.Suspense fallback="loading...">
            <Routes>
              <Route path="/" element={<App></App>} />
              <Route path="/posts" element={<Posts></Posts>} />
              <Route path="/posts/:id" element={<Post></Post>} />
              <Route path="/posts/new" element={<CreatePost />} />
            </Routes>
          </React.Suspense>
        </Boundary>
      </div>
      <Links></Links>
    </div>
  );
};
