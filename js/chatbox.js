//TOGGLE
const chatboxToggle = document.querySelector(".chatbox-toggle")
const chatboxMessage = document.querySelector(".chatbox-message-wrapper")

chatboxToggle.addEventListener("click", function () {
    chatboxMessage.classList.toggle("show")
})

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector(".chatbox-message-dropdown-toggle")
const dropdonwMenu = document.querySelector(".chatbox-message-dropdown-menu")

dropdownToggle.addEventListener("click", function () {
    dropdonwMenu.classList.toggle("show")
})

document.addEventListener("click", function (e) {
    if(!e.target.matches(".chatbox-message-dropdown, .chatbox-message-dropdown *")) {
        dropdonwMenu.classList.remove("show")
    }
})

document.addEventListener