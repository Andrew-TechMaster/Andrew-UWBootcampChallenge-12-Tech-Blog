// {==================== Logout | POST [api/user/logout] | script for main.handlebars ====================}
const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If successful, redirect the browser to the homepage (homepage.handlebars)
    document.location.replace("/");
  } else {
    // console.log(response);
    alert("Failed to log out.");
  }
};

document.querySelector("#logout").addEventListener("click", logout);
