const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const slides = document.querySelectorAll(".slide");

var currentIndex = 0;

var autoPlay = false;
var forward = true;
// 5s自动播放
var interval = 5000;

next.addEventListener("click",handleNextClicked);
prev.addEventListener("click",handlePrevClicked);

if(autoPlay){
    setInterval(forward? handleNextClicked : handlePrevClicked ,interval);
}

function handleNextClicked(){
    let current = slides[currentIndex];
    current.classList.remove("current");

    currentIndex++;
    if(currentIndex >= slides.length){
        currentIndex = 0;
    }
    slides[currentIndex].classList.add("current");

}

function handlePrevClicked(){
    let current = slides[currentIndex];
    current.classList.remove("current");

    currentIndex--;
    if(currentIndex < 0){
        currentIndex = slides.length - 1;
    }
    slides[currentIndex].classList.add("current");

}