const targetBox = document.querySelector(".moveBox");
const lineX = document.querySelector(".lineX");
const lineY = document.querySelector(".lineY");
const cursor = document.querySelector("img");

window.addEventListener("mousemove", (e) => {
    let pageX = e.clientX + 'px';
    let pageY = e.clientY + 'px';

    targetBox.textContent = `${pageX}, ${pageY}`;

    targetBox.style.left = pageX;
    targetBox.style.top = pageY;
    
    lineY.style.left = pageX;
    lineX.style.top = pageY;

    cursor.style.left = pageX;
    cursor.style.top = pageY;
});