import { Link } from '../../lib';

const posts = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  title: `Posts ${index + 1}`,
}));

export default function Posts() {
  return (
    <>
      <h1>Posts List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/me/posts/${String(post.id)}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
