const input = document.querySelector(".textInput");
const btn = document.querySelector(".addBtn");
const ul = document.querySelector(".list_wrap");

input.addEventListener("keydown", onAdd);
input.addEventListener("keypress", () => {
    console.log('k')
});

btn.addEventListener("click", onAdd);

function onAdd(e) {
    if(e.keyCode !== 13) return;
    
    if(input.value == '') {
        input.focus();
        return;
    };

    const item = ceateItem(input.value);
    ul.appendChild(item);
    
    item.scrollIntoView({block : 'center'});
    input.value = '';
    input.focus();
}

function ceateItem(text) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    li.textContent = text;
    button.innerText = "❌";
    li.appendChild(button);
    button.classList.add("delBtn");

    button.addEventListener("click", deleteItem);

    return li;
}

function deleteItem(e) {
    e.target.parentNode.remove();
}

