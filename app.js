const drop = document.getElementById('dropzone');
const ele = document.querySelectorAll('.ele');
const editor = document.getElementById('editor');
const properties = document.querySelectorAll('.properties');

const text = document.getElementById('text');
const width = document.getElementById('width');
const height = document.getElementById('height');
const left = document.getElementById('left');
const tp = document.getElementById('top');
const color = document.getElementById('color');


let objects = [];
let selectedElemnt = null;


 document.addEventListener('click', (e) => {
            if (!editor.contains(e.target)) {
                selectedElemnt = null;
                objects.forEach(obj => obj.classList.remove('selected'));
                resetInputs();
            }
});





ele.forEach(el => {
    el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('elementType', e.target.getAttribute('data-type'));
        e.dataTransfer.setData('offx', e.offsetX);
        e.dataTransfer.setData('offy', e.offsetY);
    });
});

drop.addEventListener('dragover', (e) => {
    e.preventDefault();
});

drop.addEventListener('drop', (e) => {
    e.preventDefault();

    const type = e.dataTransfer.getData('elementType');
    const offsetX = parseInt(e.dataTransfer.getData('offx'));
    const offsetY = parseInt(e.dataTransfer.getData('offy'));

    const dropzone = e.target.getBoundingClientRect();
    const dropX = e.clientX - dropzone.left - offsetX;
    const dropY = e.clientY - dropzone.top - offsetY;

    if (dropX < 20 || dropX > dropzone.width - 20) {
        return;
    }

    let newele = document.createElement(type);
    newele.classList.add('nwele');
    newele.style.left = `${dropX}px`;
    newele.style.top = `${dropY}px`;
    

    // Click event listener to select the clicked element
    newele.addEventListener('click', (event) => {
        event.stopPropagation(); 
        selectElement(newele)
    });



    objects.push(newele);
    drop.appendChild(newele);
});

function selectElement(element) {
            selectedElemnt = element;
            objects.forEach(obj => obj.classList.remove('selected'));
            element.classList.add('selected');
            updateInputs(); 
        }

function updateInputs() {
    if (selectedElemnt) {
        let styles = window.getComputedStyle(selectedElemnt);
        width.value = parseInt(styles.width);
        height.value = parseInt(styles.height);
        left.value = parseInt(styles.left);
        tp.value = parseInt(styles.top);
        color.value = rgbToHex(styles.backgroundColor);
    }
}


function resetInputs() {
    let st = window.getComputedStyle(drop);
    width.value = parseInt(st.width);
    height.value = parseInt(st.height);
    left.value = parseInt(st.left);
    tp.value = parseInt(st.top);
    color.value = rgbToHex(st.backgroundColor);
}


function rgbToHex(rgb) {
            let rgbValues = rgb.match(/\d+/g);
            if (!rgbValues) return "#000000";
            return `#${((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2])).toString(16).slice(1).toUpperCase()}`;
}




function applyStyle() {
    if (selectedElemnt) {
        selectedElemnt.style.width = width.value + 'px';
        selectedElemnt.style.height = height.value + 'px';
        selectedElemnt.style.left = left.value + 'px';
        selectedElemnt.style.top = tp.value + 'px';
        selectedElemnt.style.backgroundColor = color.value;   
    }
    else{
        drop.style.backgroundColor = color.value;
    }

}


properties.forEach(ele =>{
    ele.addEventListener('input',applyStyle);
})









