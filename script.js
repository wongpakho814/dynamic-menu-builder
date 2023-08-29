// Toggle sidebar for mobile
document.querySelector(".hamburger-menu").addEventListener("click", () => {
  let level2menuOpened = true;
  
  // Check if any level 2 menu is showing when clicking on the hamburger menu button
  document.querySelectorAll(".nav-dropdown-wrapper").forEach((element) => {
    // If there is, close them instead of the navbar
    if (element.classList.contains("change2")) {
      element.classList.remove("change2");
      level2menuOpened = false;
    }
  });

  if (level2menuOpened) {
    document.querySelector(".container").classList.toggle("change");
  }
});

// Open the level 2 menu if the level 1 menu is clicked
document.querySelectorAll(".nav-list-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.currentTarget.children[1]) {
      e.currentTarget.children[1].classList.add("change2");
    }
  });
});
// End of toggle sidebar

// Toggle switch role button
function roleDropdown() {
  document.querySelector(".dropdown-menu").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropdown-toggle")) {
    var dropdowns = document.getElementsByClassName("dropdown-menu");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
// End of toggle switch role button

// Fetching data for the permissionList and systemStatus parameters
const fetchJSON = (roleId) => {
  fetch(`https://my-json-server.typicode.com/lapisit/code-test-data/menu-bar-parameters/${roleId}`)
    .then((response) => response.json())
    .then((data) => {
      const permissionList = data.permissionList;
      const systemStatus = data.systemStatus;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Default to roleId = 1
fetchJSON(1);

// Fetch data everytime switch role button is clicked
// document.querySelector(".switch-role").addEventListener("click", () => {
//   fetchJSON(2);
// });
// End of data fetching