// Creating an array or dictionary to store the list of menu, permission and system status
const level1MenuList = [
  "menu_1",
  "menu_2",
  "menu_3",
  "menu_4",
  "menu_5",
  "menu_6",
  "menu_7",
];

const permissionDict = {
  PERMISSION_1: ["menu_5_2", "menu_5_3"],
  PERMISSION_2: ["menu_7", "menu_7_1"],
  PERMISSION_3: ["menu_2", "menu_2_1"],
  PERMISSION_4: ["menu_2_2", "menu_6_2"],
  PERMISSION_6: ["menu_1", "menu_1_1", "menu_1_2"],
  PERMISSION_8: ["menu_3", "menu_3_1"],
  PERMISSION_12: ["menu_7_3"],
  PERMISSION_13: ["menu_5", "menu_5_1"],
  PERMISSION_14: ["menu_2_3"],
  PERMISSION_15: ["menu_2_4"],
  PERMISSION_16: ["menu_7_2"],
  PERMISSION_17: ["menu_6", "menu_6_1"],
  PERMISSION_18: ["menu_4_2"],
  PERMISSION_19: ["menu_4_3"],
  PERMISSION_26: ["menu_4", "menu_4_1"],
  PERMISSION_28: ["menu_3_2"],
};

const systemStatusDict = {
  SYSTEM_CONTROL_1: ["menu_6", "menu_6_1", "menu_6_2"],
  SYSTEM_CONTROL_2: ["menu_1", "menu_1_1", "menu_1_2"],
  SYSTEM_CONTROL_3: ["menu_2", "menu_2_1"],
  SYSTEM_CONTROL_4: ["menu_2_3"],
  SYSTEM_CONTROL_5: ["menu_2_2"],
  SYSTEM_CONTROL_6: ["menu_7", "menu_7_1"],
  SYSTEM_CONTROL_7: ["menu_7_2"],
  SYSTEM_CONTROL_8: ["menu_3_2"],
  SYSTEM_CONTROL_9: ["menu_4", "menu_4_1"],
  SYSTEM_CONTROL_10: ["menu_7_3"],
  SYSTEM_CONTROL_12: ["menu_2_4"],
  SYSTEM_CONTROL_14: ["menu_5", "menu_5_1"],
  SYSTEM_CONTROL_15: ["menu_5_2"],
  SYSTEM_CONTROL_16: ["menu_5_3"],
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

// Fetching data for the permissionList and systemStatus parameters and process them
var permissionList = [];
var systemStatusList = [];
var menuToBeRendered = [];

const fetchJSON = async (roleId) => {
  permissionList = [];
  systemStatusList = [];
  menuToBeRendered = [];

  try {
    const res = await fetch(
      `https://my-json-server.typicode.com/lapisit/code-test-data/menu-bar-parameters/${roleId}`
    );
    let obj = await res.json();
    permissionList = obj.permissionList;
    const systemStatus = obj.systemStatus;

    // Push the system status returning true to the systemStatusList array
    for (const [key, value] of Object.entries(systemStatus)) {
      if (value === true) {
        systemStatusList.push(key);
      }
    }

    // Process and render the menu
    processData();
    renderMenu();
  } catch (error) {
    console.error(error);
  }
};

// Process the data
const processData = () => {
  // Add and compress all menus with permission into an array
  let permissionMenu = [];

  permissionList.forEach((item) => {
    if (permissionDict[item] !== undefined) {
      permissionMenu = permissionMenu.concat(permissionDict[item]);
    }
  });

  // Add menu to menuToBeRendered array if it is present in both permissionMenu AND corresponding column in systemStatusDict
  systemStatusList.forEach((stat) => {
    systemStatusDict[stat].forEach((menu) => {
      if (permissionMenu.includes(menu)) {
        menuToBeRendered.push(menu);
      }
    });
  });
};

/*
 * If level 2 menu is permitted but not the level 1 menu, remove the corresponding level 2 menu. And if any level 1 menu
 * does not contain level 2 menu, remove that level 1 menu
 */
const filterMenuToBeRender = () => {
  // Filtering level 2 menu
  level1MenuList.forEach((level1Menu) => {
    // If for example menuToBeRendered contains "menu_1_1" but not "menu_1", remove all "menu_1_1" or entries that follow that regex
    if (!menuToBeRendered.includes(level1Menu)) {
      let regex = new RegExp(`^${level1Menu}_\\d+$`); // Regex for "menu_1_1", "menu_1_2" etc with "menu_{n}" being the prefix
      menuToBeRendered = menuToBeRendered.filter((menu) => !regex.test(menu));
    }
  });

  // Filtering level 1 menu, for example if patterns like [..."menu_1", "menu_2",...] exist, remove "menu_1"
  let regex = new RegExp(`^menu_\\d+$`); // // Regex for "menu_1", "menu_2" etc

  for (let i = 0; i < menuToBeRendered.length - 1; i++) {
    if (
      regex.test(menuToBeRendered[i]) &&
      regex.test(menuToBeRendered[i + 1])
    ) {
      menuToBeRendered.splice(i, 1);
    }
  }

  // if the array length is only 1, that means no level 2 menu exists and thus nothing should be rendered
  if (menuToBeRendered.length === 1) {
    menuToBeRendered.pop();
  }
};

// Render the menu
const renderMenu = () => {
  // Reset content in <ul class="nav-list"> for each render
  const navList = document.querySelector(".nav-list");
  navList.innerHTML = "";

  filterMenuToBeRender();

  if (menuToBeRendered.length !== 0) {
    level1MenuList.forEach((level1Menu) => {
      if (menuToBeRendered.includes(level1Menu)) {
        setTimeout(() => {
          renderLevel1Menu(level1Menu, navList);
        }, "500");
      }
    });
  // Let the user knows he/she is not permitted to view any menu
  } else {
    const navListItem = document.createElement("li");
    navListItem.classList.add("nav-list-item");

    const navbarLink = document.createElement("p");
    navbarLink.classList.add("navbar-link");
    navbarLink.classList.add("non-clickable");

    const textNode = document.createTextNode("No menu can be rendered!");

    navbarLink.appendChild(textNode);
    navListItem.appendChild(navbarLink);
    navList.appendChild(navListItem);
  }

  reRenderSidebarLevel2Menu();
};

// Render level 1 menu
const renderLevel1Menu = (menu, navList) => {
  const navListItem = document.createElement("li");
  navListItem.classList.add("nav-list-item");
  const textNode = document.createTextNode(menu);

  const navbarLink = document.createElement("a");
  navbarLink.classList.add("navbar-link");
  navbarLink.href = "#";

  navbarLink.appendChild(textNode);
  navListItem.appendChild(navbarLink);
  renderLevel2Menu(navListItem, menu);
  navList.appendChild(navListItem);
};

// Render level 2 menu
const renderLevel2Menu = (navListItem, level1Menu) => {
  const navDropdownWrapper = document.createElement("div");
  navDropdownWrapper.classList.add("nav-dropdown-wrapper");

  const navDropdown = document.createElement("ul");
  navDropdown.classList.add("nav-dropdown");

  let regex = new RegExp(`^${level1Menu}_\\d+$`); // Regex for "menu_1_1", "menu_1_2" etc with "menu_{n}" being the prefix

  // For example, if level1Menu = "menu_1", find and renders all menu with regex "menu_1_{n}" in menuToBeRendered
  menuToBeRendered.forEach((menu) => {
    if (regex.test(menu)) {
      const navDropdownItem = document.createElement("li");
      navDropdownItem.classList.add("nav-dropdown-item");

      const navLink = document.createElement("a");
      const textNode = document.createTextNode(menu);
      navLink.href = "#";

      navLink.appendChild(textNode);
      navDropdownItem.appendChild(navLink);
      navDropdown.appendChild(navDropdownItem);
    }
  });

  navDropdownWrapper.appendChild(navDropdown);
  navListItem.appendChild(navDropdownWrapper);
};

// Default to roleId = 1
fetchJSON(1);

// Fetch data everytime switch role button is clicked
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    fetchJSON(this.dataset.roleid);
  });
});
// End of data processing and rendering
