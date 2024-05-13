import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "./api/posts";
import Post from "./Post";

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    //  retry: 3, // amount of retries
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data); // manually update data - don't wait for re-fetch
      queryClient.invalidateQueries(["posts"], { exact: true }); // invalidate only query with ['posts'] exact matchm ['posts', 1] will be excluded
      setCurrentPage(<Post id={data.id} />); // render new post data
    },
    //  variable - same data that passed to mutate
    // onSuccess: (data, variables, context) => {} // invoked on success mutation
    // onError: (error, variables, context) => {} // invoked on error mutation
    // onSettle: (data, error, variables, context) => {} // works similar to finally in Promises
    // onMutate: (variables) // called before mutationFn, place where to set context
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
