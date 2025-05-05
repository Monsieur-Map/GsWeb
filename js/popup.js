// weapon --------------------------------------------------------------------------------
// bat su kien cho nguyen list
const weapon_List = document.getElementById("weapon_items");
weapon_List?.addEventListener("click", async (e) => {
  // lay element can update du lieu trong popup
  const name = document.getElementById("item_name");
  const rarity = document.getElementById("rarity");
  const obtain_via = document.getElementById("obtain_via");
  const base_atk = document.getElementById("base_atk");

  // kiem tra dang click tai vi tri nao => lay ra div.col gan nhat
  const div_clicked = e.target.closest(".col");
  //   load api
  await fetch(`https://genshinlist.com/api/weapons`)
    .then(
      (json) => json.json() //Chuyển json thành kiểu javascript
    )
    .then((data) => {
      //  loc danh sach => lay ra item can hien thi
      const element = data.find((item) => item.slug === div_clicked.id);
      // update du lieu len popup
      name.innerText = `Name: ${element.name}`;
      rarity.innerText = `Rarity: ${element.rarity}`;
      obtain_via.innerText = `Obtain Via: ${element.obtain}`;
      base_atk.innerText = `Base Atk: ${element.atk}`;
    })
    .catch((error) => {
      console.error(error);
    });
});

// character -----------------------------------------------------------------------------------
// bat su kien cho nguyen list
const character_List = document.getElementById("character_items");
character_List?.addEventListener("click", async (e) => {
  // lay element can uodate du lieu trong popup
  const name = document.getElementById("item_name");
  const rarity = document.getElementById("rarity");
  const description = document.getElementById("description");
  const gender = document.getElementById("gender");
  const birthday = document.getElementById("birthday");
  const vision = document.getElementById("vision");
  const weapon = document.getElementById("weapon");
  const obtain = document.getElementById("obtain");

  // kiem tra dang click tai vi tri nao => lay ra div.col gan nhat
  const div_clicked = e.target.closest(".my-card");
  //   load du lieu tu local storage
  const data = JSON.parse(localStorage.getItem("characters"));
  //  loc danh sach => lay ra item can hien thi
  const element = data.find((item) => item.id == div_clicked.id);
  // update du lieu len popup
  name.innerText = `Name: ${element.name}`;
  rarity.innerText = `Rarity: ${element.rarity}`;
  obtain.innerText = `Obtain: ${element.obtain}`;
  description.innerText = `Description: ${element.description}`;
  gender.innerText = `Gender: ${element.gender}`;
  birthday.innerText = `Birthday: ${element.birthday}`;
  vision.innerText = `Vision: ${element.vision}`;
  weapon.innerText = `Weapon: ${element.weapon}`;
});
