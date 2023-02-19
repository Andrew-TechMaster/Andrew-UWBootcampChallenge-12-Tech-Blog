const createNewCommentBtnHandler = async (event) => {
  event.preventDefault();

  // Collect values from the text area
  const comment_content = document
    .querySelector("#comment-text-field")
    .value.trim();

  const post_id = document.querySelector("#comment-text-field").dataset.postid;

  if (comment_content) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ content: comment_content, post_id: post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the same post page?...
      document.location.replace(`/post/${post_id}`);
      return;
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#add-comment-btn")
  .addEventListener("click", createNewCommentBtnHandler);
