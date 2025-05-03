// bat su kien khi thay doi filter
document.getElementById("type-selected").onchange = function () {
  const type_selected = document.querySelector(
    "#type-selected option:checked"
  ).value;
  // lay danh sach card trong index html
  // const characterListContainer = document.getElementById("character_items");
  const characterList = document.querySelectorAll(".my-card");

  if (type_selected === "none") {
    // hien thi tat ca card
    characterList.forEach((card) => card.classList.remove("hide"));
  } else {
    characterList.forEach((card) => {
      if (card.dataset.type == type_selected) {
        // hien thi card cung loai
        card.classList.remove("hide");
      } else {
        // an card khac loai
        card.classList.add("hide");
      }
    });
  }
};
