/* Form Submit Button */

const submitBtn = document.querySelector("[data-submit-btn]")
submitBtn.addEventListener("click", () => {
    submitBtn.classList.add("hide");
    //^^^plays animation only once    
    //submitBtn.classList.toggle("hide");
    //^^^allows play animation back and forth
})

/* Thank you message function*/

function thankUser() {
    const userName = document.getElementById("first-name").value;
    const greeting = "Thanks " + userName + "! I'll get back to you ASAP! ";
    const greetingOutPut = document.getElementById("textarea");
    /* greetingOutPut = greeting;*/
    greetingOutPut.value = greeting;
}

const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", thankUser);

/* Testing Purpose */
// var path = document.querySelector("path");
// var length = path.getTotalLength();

// console.log(length);//40.84104919433594