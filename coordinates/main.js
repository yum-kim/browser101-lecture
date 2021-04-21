const targetBox = document.querySelector(".moveBox");
const lineX = document.querySelector(".lineX");
const lineY = document.querySelector(".lineY");
const cursor = document.querySelector("img");
const cursorRect = cursor.getBoundingClientRect();
const cursorHalfWidth = cursorRect.width / 2;
const cursorHalfHeight = cursorRect.height / 2;


//top, left는 브라우저 render시에 layout부터 발생해서 성능이 안좋음!
// window.addEventListener("mousemove", (e) => {
//     let pageX = e.clientX + 'px';
//     let pageY = e.clientY + 'px';

//     targetBox.textContent = `${pageX}, ${pageY}`;

//     targetBox.style.left = pageX;
//     targetBox.style.top = pageY;
    
//     lineY.style.left = pageX;
//     lineX.style.top = pageY;

//     cursor.style.left = pageX;
//     cursor.style.top = pageY;
// });

addEventListener('load', () => {

    //translate은 layout이 발생하지않아 성능에 좋음!
    window.addEventListener("mousemove", (e) => {
        let pageX = e.clientX;
        let pageY = e.clientY;
    
        targetBox.textContent = `${pageX}px, ${pageY}px`;
        
        targetBox.style.transform = `translate(${pageX + 20}px, ${pageY + 20}px)`;
        lineX.style.transform = `translateY(${pageY}px)`;
        lineY.style.transform = `translateX(${pageX}px)`;
        cursor.style.transform = `translate(${pageX - cursorHalfWidth}px, ${pageY - cursorHalfHeight}px)`;
    });
});

//간혹 getBoundingClientRect 받았을 때 width, height가 없는 경우가 있는데, 이미지가 불러와지지않았을 확률이 높음. window.load된 뒤에 실행시켜야함!
