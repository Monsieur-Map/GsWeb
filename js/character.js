async function loadCharacterFromAPI() {
  const item_List = document.getElementById("character_items");
  let data = null;

  // kiem tra du lieu da co trong local storage chua
  if (!localStorage.getItem("characters")) {
    // Lấy dữ liệu từ API
    data = await fetch(`https://genshinlist.com/api/characters`)
      .then((json) => json.json())
      .then((data) => {
        // luu du lieu vao local storage
        localStorage.setItem("characters", JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(data);
  } else {
    data = JSON.parse(localStorage.getItem("characters"));
  }

  // load du lieu len HTML
  data.forEach((element) => {
    //Create UI
    const UI_item = `
                    <div class="col-3" data-type="${element.vision}" id="${element.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width: 400px;">
    
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1617899636/genshin-app/characters/${element.name}/card.jpg" alt="${element.name}" />
    
                    </div>`;

    item_List.innerHTML += UI_item;
  });
}

loadCharacterFromAPI();
