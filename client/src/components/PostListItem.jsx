import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image
            src={post.img}
            className="rounded-2xl object-cover "
            width="500"
          />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold ">
          {post.title}
        </Link>
        <div className="flex items gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={`/${post.slug}`} className="text-blue-800">
            {post.user.username}
          </Link>
          <span>on</span>
          <Link to={`/${post.slug}`} className="text-blue-800">
            Web Design
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p className="text-gray-500">{post.desc}</p>
        <Link to={`/${post.slug}`} className="text-blue-800 underline text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
