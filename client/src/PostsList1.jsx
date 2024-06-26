import { useQueries, useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

export default function PostsList1() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "Initial Data" }],
  });

  //  to do query depending on other query
  // const queries = useQueries({
  //   queries: (postsQuery?.data ?? []).map((post) => {
  //     return {
  //       queryKey: ["posts", post.id],
  //       queryFn: () => getPosts(post.id),
  //     };
  //   }),
  // });
  // console.log(queries.map((q) => q.data));

  if (postsQuery.status === "loading") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
