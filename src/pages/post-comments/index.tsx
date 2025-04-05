import { Link, useParams } from '../../../lib';

export default function PostComments() {
  const { slug } = useParams();
  return (
    <>
      <h1>Post Comments</h1>
      <Link to={`/me/posts/${slug}`}>{'< Go Back'}</Link>
    </>
  );
}
