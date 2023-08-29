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

// Creating a dictionary to store the list of permission and system status 
const permissionDict = {
  "PERMISSION_1": ["menu_5_2", "menu_5_3"],
  "PERMISSION_2": ["menu_7", "menu_7_1"],
  "PERMISSION_3": ["menu_2", "menu_2_1"],
  "PERMISSION_4": ["menu_2_2", "menu_6_2"],
  "PERMISSION_6": ["menu_1", "menu_1_1", "menu_1_2"],
  "PERMISSION_8": ["menu_3", "menu_3_1"],
  "PERMISSION_12": ["menu_7_3"],
  "PERMISSION_13": ["menu_5", "menu_5_1"],
  "PERMISSION_14": ["menu_2_3"],
  "PERMISSION_15": ["menu_2_4"],
  "PERMISSION_16": ["menu_7_2"],
  "PERMISSION_17": ["menu_6", "menu_6_1"],
  "PERMISSION_18": ["menu_4_2"],
  "PERMISSION_19": ["menu_4_3"],
  "PERMISSION_26": ["menu_4", "menu_4_1"],
  "PERMISSION_28": ["menu_3_2"]
};

const systemStatusDict = {
  "SYSTEM_CONTROL_1": ["menu_6", "menu_6_1", "menu_6_2"],
  "SYSTEM_CONTROL_2": ["menu_1", "menu_1_1", "menu_1_2"],
  "SYSTEM_CONTROL_3": ["menu_2", "menu_2_1"],
  "SYSTEM_CONTROL_4": ["menu_2_3"],
  "SYSTEM_CONTROL_5": ["menu_2_2"],
  "SYSTEM_CONTROL_6": ["menu_7", "menu_7_1"],
  "SYSTEM_CONTROL_7": ["menu_7_2"],
  "SYSTEM_CONTROL_8": ["menu_3_2"],
  "SYSTEM_CONTROL_9": ["menu_4", "menu_4_1"],
  "SYSTEM_CONTROL_10": ["menu_7_3"],
  "SYSTEM_CONTROL_12": ["menu_2_4"],
  "SYSTEM_CONTROL_14": ["menu_5", "menu_5_1"],
  "SYSTEM_CONTROL_15": ["menu_5_2"],
  "SYSTEM_CONTROL_16": ["menu_5_3"]
};

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
      console.log(permissionList, systemStatus);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Default to roleId = 1
fetchJSON(1);

// Fetch data everytime switch role button is clicked
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    fetchJSON(this.dataset.roleid);
  });
});


// End of data fetching