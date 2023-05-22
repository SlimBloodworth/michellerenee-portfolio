/* Form Submit Button */

const submitBtn = document.querySelector("[data-submit-btn]")
submitBtn.addEventListener("click", () => {
    submitBtn.classList.add("hide");
    //^^^plays animation only once    
    //submitBtn.classList.toggle("hide");
    //^^^allows play animation back and forth
})

// var path = document.querySelector("path");
// var length = path.getTotalLength();

// console.log(length);//40.84104919433594