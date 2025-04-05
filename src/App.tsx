import { Link, Router } from './lib';

import routes from './routes';
import './App.css';

export default function App() {
  return (
    <Router routes={routes}>
      {(jsx) => (
        <div className="layout">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/me">My Profile</Link>
            <Link to="/me/posts">My Posts</Link>
            <Link to="/some/undefined/path">404</Link>
          </nav>
          <main>{jsx}</main>
        </div>
      )}
    </Router>
  );
}
