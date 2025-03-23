//Constructor function
function User (
    avatar = "https://i.pinimg.com/736x/44/b8/6f/44b86fe4898b9212ca7c973a2f4a4b27.jpg", 
    username, 
    email, 
    point=0
){
    //Tạo thuộc tính (properties) cho đối tượng
    // this là từ khoá đại diện cho đối tượng được tạo ra từ consturctor function
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.point = point;
    // tạo phương thức (method) cho đối tượng

    //Trả về đối tượng user sau khi được quy định thuộc tính và phương thức
    return{
        username: this.username,
        email: this.email,
        avatar: this.avatar,
        point: this.point,
    }
}
