// bat su kien khi thay doi filter
document.getElementById("type-selected").onchange = function () {
  const type_selected = document.querySelector(
    "#type-selected option:checked"
  ).value;
  // lay danh sach card trong index html
  const characterListContainer = document.getElementById("content");
  const characterList = characterListContainer.querySelectorAll(" .col");

  if (type_selected === "none") {
    // hien thi tat ca card
    characterList.forEach((card) => card.classList.remove("hide"));
  } else {
    // an het card
    characterList.forEach((card) => card.classList.add("hide"));
    // hien thi card cung loai
    const selected_cards = document.querySelectorAll(
      `.col[data-type='${type_selected}']`
    );
    selected_cards.forEach((card) => card.classList.remove("hide"));
  }
};
