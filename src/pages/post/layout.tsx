import { Link, ChildRoutes, useParams } from '../../lib';

export default function Post() {
  const { slug } = useParams();

  return (
    <>
      <header>
        <h1>Post {slug}</h1>
        <Link to={'/me/posts'}>{'< Go Back'}</Link>
      </header>
      <ChildRoutes />
    </>
  );
}
