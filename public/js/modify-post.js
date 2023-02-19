// {==================== Update Post | POST [api/post/:id] | script for modify-post.handlebars ====================}
const updatePostHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const modified_title = document.querySelector("#post-title").value.trim();
  const modified_content = document.querySelector("#post-content").value.trim();
  const id = document.querySelector("#create-post-div").dataset.postid;

  //// window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  //   const id = window.location.toString().split("/")[
  //     window.location.toString().split("/").length - 1
  //   ];

  if (modified_title && modified_content) {
    // Send a PUT request to the API endpoint
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ modified_title, modified_content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the post page (post.handlebars)
      document.location.replace(`/post/${id}`);
    } else {
      // console.log(response);
      alert(response.statusText);
    }
  }
};

// {==================== Delete Post | Delete [api/post/:id] | script for modify-post.handlebars ====================}
const deletePostHandler = async (event) => {
  const id = document.querySelector("#create-post-div").dataset.postid;
  // const id = sometarget.getAttribute("data-id");
  if (id) {
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page (dashboard.handlebars)
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector("#updateBtn")
  .addEventListener("click", updatePostHandler);

document
  .querySelector("#deleteBtn")
  .addEventListener("click", deletePostHandler);
