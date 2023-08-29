// Creating an array or dictionary to store the list of menu, permission and system status
const menuList = [
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

// If level 2 menu is permitted but not the level 1 menu, remove the corresponding level 2 menu
const filterMenuToBeRender = () => {
  menuList.forEach((level1Menu) => {
    // If for example menuToBeRendered contains "menu_1_1" but not "menu_1", remove all "menu_1_1" or entries that follow that regex
    if (!menuToBeRendered.includes(level1Menu)) {
      let regex = new RegExp(`^${level1Menu}_\\d+$`); // Regex for "menu_1_1", "menu_1_2" etc with "menu_1" being the prefix
      menuToBeRendered = menuToBeRendered.filter(menu => !regex.test(menu))
    }
  });
};

// Render the menu
const renderMenu = () => {
  const navList = document.querySelector(".nav-list");

  filterMenuToBeRender();

  menuList.forEach((level1Menu) => {
    if (menuToBeRendered.includes(level1Menu)) {
      // Render the level 1 menu
      const navListItem = document.createElement("li");
      navListItem.classList.add("nav-list-item");
      const textNode = document.createTextNode(level1Menu);
      
      const navbarLink = document.createElement('a');
      navbarLink.classList.add("navbar-link");
      navbarLink.href = '#';

      navbarLink.appendChild(textNode);
      navListItem.appendChild(navbarLink);
      navList.appendChild(navListItem);
    }
  });
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
