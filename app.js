const drop = document.getElementById('dropzone');
const ele = document.querySelectorAll('.ele');


ele.forEach(el =>{
	el.addEventListener('dragstart',(e)=>{
		e.dataTransfer.setData('elementType', e.target.getAttribute('data-type'));

		e.dataTransfer.setData('offx', e.offsetX);
		e.dataTransfer.setData('offy', e.offsetY);
	})
});

drop.addEventListener('dragover',(e)=>{
	e.preventDefault();
});


drop.addEventListener('drop',(e)=>{
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
	newele.classList.add('nwele')
	newele.style.left = (e.clientX - dropzone.left - offsetX + 'px');
	newele.style.top = (e.clientY - dropzone.top - offsetY + 'px');
	
	
	drop.appendChild(newele);
})






