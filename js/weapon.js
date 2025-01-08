async function loadWeaponFromAPI() {
  const item_List = document.getElementById("weapon_items");
  // Lấy dữ liệu từ API
  await fetch(`https://genshinlist.com/api/weapons`)
    .then(
      (json) => json.json() //Chuyển json thành kiểu javascript
    )
    .then(
      //Load dữ liệu lên UI
      (data) => {
         data.forEach((element) => {
        //Create UI
        const UI_item = `  
                    <div class="col" data-type="${element.type}" id="${element.slug}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    
                      <img src="https://genshinlist.com/assets/img/weapons/${element.slug}.png" alt="${element.name}"  />
                    
                    </div>`;

        item_List.innerHTML += UI_item; //Thêm dữ liệu vào UI
         });
      }
    )
    .catch((error) => {
      console.log(error);
    });
}

loadWeaponFromAPI();

// search data ---------------------------------------------------------------------
//  search by name ======================
function searchByName() {
  let input = document.getElementById("exampleDataList").value;
  input = input.toLowerCase();
  let x = document.querySelectorAll("#weapon_items .col");

  for (i = 0; i < x.length; i++) {
    // lay ten tung item trong HTML
    const item_name = x[i].getElementsByTagName("img")[0].alt.toLowerCase();
    if (!item_name.includes(input)) {
      console.log(x[i]);
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";
    }
  }
}

// bat su kien khi nhan nut search
document.getElementById("search_btn_2").addEventListener("click", searchByName);

// search by type ======================
document.getElementById("type-selected").onchange = function () {
  const type_selected = document.querySelector(
    "#type-selected option:checked"
  ).value;
  // lay danh sach card trong index html
  const weaponListContainer = document.getElementById("weapon_items");
  const weaponList = weaponListContainer.querySelectorAll(".col");

  if (type_selected === "none") {
    // hien thi tat ca card
    weaponList.forEach((card) => card.classList.remove("hide"));
  } else {
    // an het card
    weaponList.forEach((card) => card.classList.add("hide"));
    // hien thi card cung loai
    const selected_cards = document.querySelectorAll(
      `.col[data-type='${type_selected}']`
    );
    console.log(selected_cards);
    selected_cards.forEach((card) => card.classList.remove("hide"));
  }
};
