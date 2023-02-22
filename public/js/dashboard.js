// {==================== show form | script for dashboard.handlebars ====================}
const createNewPostBtnHandler = async (event) => {
  event.preventDefault();

  var element = document.getElementById("create-post-div");
  element.classList.remove("d-none");
};

// {==================== hide form | script for dashboard.handlebars ====================}
const hideFormHandler = async (event) => {
  event.preventDefault();

  var element = document.getElementById("create-post-div");
  element.classList.add("d-none");
};

// {==================== Add post | POST [api/post] | script for dashboard.handlebars ====================}
const submitFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#create-new-post-btn")
  .addEventListener("click", createNewPostBtnHandler);

document.querySelector("#hideIcon").addEventListener("click", hideFormHandler);

document
  .querySelector("#create-post-form")
  .addEventListener("submit", submitFormHandler);
