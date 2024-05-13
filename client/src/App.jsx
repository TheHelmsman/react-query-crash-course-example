import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getPost } from "./api/posts";
import { CreatePost } from "./CreatePost";
import Post from "./Post";
import { PostListInfinite } from "./PostListInfinite";
import { PostListPaginated } from "./PostListPaginated";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  //  pre-fetch data when user hover on button
  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    });
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  );
}

// Basics:

//  /posts -> ['posts']
//  /posts/1 -> ['posts', post.id]
//  /posts?authorId=1 -> ['posts', {authorId: 1}]
//  /posts/2/comments -> ['posts', post.id, 'comments']

// const POSTS = [
//   { id: 1, title: "post 1" },
//   { id: 2, title: "post 2" },
// ];

// export default function App() {
//   const queryClient = useQueryClient();

//   const postsQuery = useQuery({
//     queryKey: ["posts"], // must be unique!
//     queryFn: (obj) =>
//       wait(1000).then(() => {
//         console.log(obj);
//         return [...POSTS];
//       }),
//   });

//   const newPostMutation = useMutation({
//     mutationFn: (title) => {
//       return wait(1000).then(() =>
//         POSTS.push({ id: crypto.randomUUID(), title })
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["posts"]); // updates representation
//     },
//   });

//   if (postsQuery.isLoading) return <h1>Loading...</h1>;
//   if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

//   return (
//     <div>
//       {postsQuery.data.map((post) => (
//         <div key={post.id}>{post.title}</div>
//       ))}
//       <button
//         disabled={newPostMutation.isLoading}
//         onClick={() => newPostMutation.mutate("new post")}
//       >
//         Add New
//       </button>
//     </div>
//   );
// }

// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }
