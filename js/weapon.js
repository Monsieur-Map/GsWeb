async function loadWeaponFromAPI () {
    const item_List = document.getElementById("weapon_items");
    // Lấy dữ liệu từ API 
    await fetch (`https://genshinlist.com/api/weapons`)
    .then(
        json => json.json() //Chuyển json thành kiểu javascript
    )
    .then(
        //Load dữ liệu lên UI
        data => {
            data.forEach(element => {
                //Create UI
                const UI_item = `  
                    <div class="col" data-type="${element.type}" id="${element.id}" >
                    
                      <img src="https://genshinlist.com/assets/img/weapons/${element.slug}.png" alt="${element.name}"  />
                    
                    </div>`;
                
                item_List.innerHTML += UI_item //Thêm dữ liệu vào UI
            });
            
        }
    )
    .catch ((error) => {console.log(error)});
    
}


loadWeaponFromAPI ();

//Bắt lấy sự kiện cho button search
document
    .getElementById("search_btn_2")
    .addEventListener("click", function (event) {
        //Không cho website load theo mặc định
        event.preventDefault();
        //Lấy dữ liệu từ input
        const item_Chosen = document.getElementById("search_items").value.trim();
        //Nếu không có dữ liệu nhận được (SEARCH KHÔNG ĐÚNG TÊN POKEMON CẦN TÌM KIẾM)
        if (!item_Chosen) {
          alert("Vui lòng nhập tên vũ khí");
          UI_item = this.hidden;
        } else {
          loadWeaponFromAPI(item_Chosen);
        }
      });




