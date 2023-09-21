const DEFAULT_COLOR = '#f31f1f';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'oneColor';

const colorStr = '123456789ABCDEF';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

function setCurrentColor(newValue) {
    currentColor = newValue;
}

function setCurrentSize(newValue) {
    currentSize = newValue;
}

function setCurrentMode(newValue) {
    currentMode = newValue;
}

const colorPic = document.getElementById('colorPic');
const eraserBtn = document.getElementById('btnEraser');
const clearBtn = document.getElementById('btnClear');
const randomColorBtn = document.getElementById('btnRandomColor');
const gridBtn = document.getElementById('btnGrid');

const sizeRange = document.querySelector('.sizeRange');
const sizeValue = document.querySelector('.sizeNow');

colorPic.onclick = () => setCurrentMode('oneColor');
colorPic.oninput = (e) => setCurrentColor(e.target.value);
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reload();
randomColorBtn.onclick = () => setCurrentMode('randomColor');
gridBtn.onclick = () => gridSwitch();

sizeRange.addEventListener('mousemove', (e) => setSizeValue(e.target.value));
sizeRange.addEventListener('change', (e) => changeCurrentSize(e.target.value));

function getRandom(range) {
    return Math.floor(Math.random() * range);
}

function clear() {
    div.innerHTML = '';
}

function reload() {
    clear();
    setupGrid(currentSize);
}

function gridSwitch() {
    const gridBox = document.querySelectorAll('.grid-box');
    gridBox.forEach(box => box.classList.toggle('grid-border'));
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function getRandomColor() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += colorStr[getRandom(colorStr.length)];
    }
    return color;
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'randomColor') {
        e.target.style.backgroundColor = getRandomColor();
    } else if (currentMode === 'oneColor') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'transparent';
    }
}

function changeCurrentSize(value) {
    setCurrentSize(value);
    setSizeValue(value);
    reload()
}

function setSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

const div = document.createElement('div');
div.classList.add('grid');

function setupGrid(size) {
    div.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    div.style.gridTemplateRows = `repeat(${size}. 1fr)`;

    for (let i = 0; i < (size * size); i++) {
        const nestDiv = document.createElement('div');
        nestDiv.classList.add('grid-box');
        nestDiv.addEventListener('mouseover', changeColor);
        nestDiv.addEventListener('mousedown', changeColor);
        div.appendChild(nestDiv);
    }
}

document.querySelector('.main').appendChild(div);

window.onload = () => {
    setupGrid(DEFAULT_SIZE)

}