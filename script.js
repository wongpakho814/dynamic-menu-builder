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
