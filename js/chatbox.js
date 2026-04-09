import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";


//MESSAGE INPUT
const textarea = document.querySelector(".chatbox-message-input")
const chatboxForm = document.querySelector(".chatbox-message-form")

textarea.addEventListener("input", function () {
    let line = textarea.value.split("\n").length

    if(textarea.rows < 6 || line < 6) {
        textarea.rows = line
    }

    if (textarea.rows > 1) {
        chatboxForm.style.alignItems = "flex-end"
    } else {
        chatboxForm.style.alignItems = "center"
    }

})




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




//CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector(".chatbox-message-content")
const chatboxNoMessage = document.querySelector(".chatbox_message_no_message")

chatboxForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    if(isValid(textarea.value)){
        await geminiReply(writeMessage()) 
    }
    
    
})

function addZero(num) {
    return num < 10 ? '0' + num : num
}

function writeMessage(argument) {
    const today = new Date()
    let message = `
            <div class="chatbox-message-item sent">
              <span class="chatbox-message-item-text">
                ${textarea.value.trim().replace(/\n/g, "<br>\n")}
              </span>
              <span class="chatbox-messge-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
            </div>
  
    `
    chatboxMessageWrapper.insertAdjacentHTML("beforeend", message)
    chatboxForm.style.alignItems = "center"
    textarea.rows = 1
    textarea.focus()

    textarea.value = ""
    chatboxNoMessage.style.display = "none"
    scrollButton()
    return textarea.value.trim().replace(/\n/g, "<br>\n");
}

function autoReply(){
    const today = new Date()
    let message = `
            <div class="chatbox-message-item received">
              <span class="chatbox-message-item-text">
                Cảm ơn bạn đã phản hồi!!!!!!!!!
              </span>
              <span class="chatbox-messge-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
            </div>
  
    `
    chatboxMessageWrapper.insertAdjacentHTML("beforeend", message)
    scrollButton()
    
}

function scrollButton() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
    let text = value.replace(/\n/g, '')
    text = text.replace(/\s/g, '')

    return text.length > 0
}

async function geminiReply(response) {

    const today = new Date()
    
        // 1. Initialize the API with your Key
    const genAI = new GoogleGenerativeAI("AIzaSyCEHJ2ywkVvEkxG3agQGk4B3MhiCH-2Zn8");

    // 2. Prepare your data (This replaces your df.to_dict logic)
    // Assuming gs_df is an array of objects in JS
    const gsData = await loadGenshinData();

    const gsDataString = JSON.stringify(gsData);


    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview", 
        systemInstruction: `
        Bạn tên là Paimon, một trợ lý AI có nhiệm vụ hỗ trợ user, player giải đáp các thắc mắc về các câu hỏi có liên quan đến các thông tin của tựa game Mihoyo (có thể bao gồm Genshin Impact, Honkai Star Rail, ZZZ).
        1. Bạn muốn tìm hiểu về thông tin của các nhân vật trong tựa game Genshin: ${gsData}
        2. Giới thiệu về các nhân vật ở các vùng có trong game vd: Liyue, Inazuma, Mondstadt.
        3. Nếu gặp những câu hỏi không liên quan đến game Genshin Impact thì hãy trả lời: "Cảm ơn bạn đã gửi thắc mắc nhưng nội dung của bạn gửi không liên quan đến tựa game Mihoyo mà chúng tôi cung cấp."
        `,
    });

    
    const prompt = response;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    




    let message = `
                <div class="chatbox-message-item received">
                <span class="chatbox-message-item-text">
                    ${result.response.text().trim().replace(/\n/g, "<br>\n")}
                </span>
                <span class="chatbox-messge-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
                </div>
    
        `
    chatboxMessageWrapper.insertAdjacentHTML("beforeend", message)
    scrollButton()
}


async function loadGenshinData() {
  try {
    // 1. Fetch the file (ensure gs.json is in the same folder as your HTML/JS)
    const response = await fetch('../data/gs.json');
    
    // 2. Check if the file was found
    if (!response.ok) throw new Error('File not found');

    // 3. Parse the JSON data into a JavaScript object
    const gsData = await response.json();
    
    console.log("Data loaded:", gsData);
    return gsData;
  } catch (error) {
    console.error("Error reading JSON:", error);
  }
}
