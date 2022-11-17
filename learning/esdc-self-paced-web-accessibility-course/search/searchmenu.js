
function handleSearchQuery(event) {
	document.querySelector(".search-error").classList.add("hidden");
  event.preventDefault();
  const query =  document.getElementById("search-menu").value.trim().replace(/[^a-zA-Z ]/g, "");
  alert(query);
}
