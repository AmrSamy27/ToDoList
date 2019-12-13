let colorInput;
let divRow;
let divCol;
let itemName;
let downBtn;
let upBtn;
let deleteBtn;
let eventsId = [];

if (localStorage.length > 0) {
    for (let key in localStorage) {       
        $('#list-item').append(localStorage.getItem(key));
        if(!isNaN(key)){
            createdElementActions(Number(key));
        }
    }
} 
$('input[type="text"]').keypress(function (event) {

    if (event.keyCode == '13') {

        event.preventDefault();
        
        createdElementActions(createRow());
    }

});
$('#add-btn').on('click', function (event) {
    if ($('form')[0].checkValidity()) {
        let paragExist = $('#list-item div div p').length == 0 ? false : true;
        if (paragExist) {
            let check =1;
            $('#list-item div div p').each(function () {
                check = $('input[type="text"]').val().localeCompare($(this).text());
                if(check =="0"){return;}
            });
                if (check == '0') {
                    return;
                } else {
                    
                    createdElementActions(createRow());
                }
            
        } else {
            
            createdElementActions(createRow());
        }
    }
});

function createRow() {
    let checkInputValidity = document.querySelector('#itemName');
    if (checkInputValidity.checkValidity()) {
        colorInput = document.createElement('input');
        divRow = document.createElement('div');
        divCol = document.createElement('div');
        itemName = document.createElement('p');
        itemName.classList.add('text-white');
        itemName.classList.add('d-inline-block');
        downBtn = document.createElement('input');
        upBtn = document.createElement('input');
        deleteBtn = document.createElement('input');
        colorInput.setAttribute('type', 'color');
        downBtn.setAttribute('type', 'button');
        upBtn.setAttribute('type', 'button');
        deleteBtn.setAttribute('type','button');
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('ml-1');

        deleteBtn.classList.add('btn-primary');
        deleteBtn.classList.add('float-right');
        deleteBtn.classList.add('mb-4');
        deleteBtn.classList.add('mt-4');
        deleteBtn.classList.add('buttonP');

        itemName.classList.add('float-left');
        itemName.classList.add('paragra');

        itemName.classList.add('colorIn');
        colorInput.classList.add('float-left');

        upBtn.classList.add('btn');
        upBtn.classList.add('buttonP');
        upBtn.classList.add('ml-1');

        upBtn.classList.add('float-right');
        upBtn.classList.add('btn-primary');
        upBtn.classList.add('mb-4');
        upBtn.classList.add('mt-4');


        downBtn.classList.add('btn');
        downBtn.classList.add('buttonP');
        downBtn.classList.add('btn-primary');
        downBtn.classList.add('float-right');
        downBtn.classList.add('mt-4');
        downBtn.classList.add('mb-4');
        divCol.classList.add('py-3');
        colorInput.classList.add('colorIn');
        colorInput.classList.add('ml-3');

        divRow.classList.add('my-3');


        colorInput.value = '#8196a9';
        itemName.innerHTML = $('#itemName').val();
        downBtn.value = 'down';
        upBtn.value = 'up';
        deleteBtn.value = 'delete';
        divRow.classList.add('row');
        divCol.classList.add('col-12');
        divRow.appendChild(divCol);
        divCol.appendChild(itemName);
        divCol.appendChild(colorInput);
        divCol.appendChild(downBtn);
        divCol.appendChild(upBtn);
        divCol.appendChild(deleteBtn);
        divCol.style.backgroundColor = colorInput.value;
        document.querySelector('#list-item').appendChild(divRow);
            divCol.setAttribute('id', localStorage.length);
            colorInput.setAttribute('id', `color${localStorage.length}`);
            upBtn.setAttribute('id', `up${localStorage.length}`);
            downBtn.setAttribute('id', `down${localStorage.length}`);
            deleteBtn.setAttribute('id', `delete${localStorage.length}`);
            localStorage.setItem(localStorage.length, divCol.parentElement.outerHTML);
        
    }
     return divCol.getAttribute('id');
}

function createdElementActions(parentDivId) {
  
    let parent = document.getElementById(parentDivId);
    let isValidDivId =eventsId.includes(parentDivId) ? true : false;
        if (!isValidDivId){
      
    $(`#${parentDivId} input[type=color]`).on('input',function(){ 
                let colorValue = this.value;
                parent.style.backgroundColor = colorValue;
                let locStorageKey = parentDivId;
                localStorage.setItem(locStorageKey, parent.parentElement.outerHTML);
    });
    
    $(`#${parentDivId} input[type="button"]`).each(function () {
       
            $(this).click( function () {
                let thisElement = $(this).val();

                //  UP EVENT

                if (thisElement.includes('up')) {
                    let thisParent = parent.parentElement;
                    if (thisParent.previousElementSibling) {
                        thisParent.parentElement.insertBefore(thisParent, thisParent.previousElementSibling);
                    }
                }
                
                // DOWN EVENT
                else if (thisElement.includes('down')) {
                    let thisParent = parent.parentElement;
                    if (thisParent.nextElementSibling) {
                        thisParent.parentElement.insertBefore(thisParent.nextElementSibling, thisParent);
                    }
                }

                // DELETE EVENT
                else if (thisElement.includes('delete')) {
                    let thisParent = parent;
                    let itemStorage = localStorage.getItem(thisParent.getAttribute('id'));
                    let idElement = thisParent.getAttribute('id');
                    let indexOfId = itemStorage.indexOf('id') + 4;
                    let idInsideElement = itemStorage.slice(indexOfId, (indexOfId + idElement.length));

                    if (localStorage.length > 1) {
                        if (idInsideElement == 0) {
                            if (localStorage.length == 2) {
                                let newElementPlace = localStorage.getItem(1);
                                let newElementIds = newElementPlace.replace(`id="${Number(idElement)+1}"`, `id="${0}"`);
                                    newElementIds =newElementIds.replace(`id="color${Number(idElement)+1}"`, `id="color${0}"`);
                                    newElementIds =newElementIds.replace(`id="down${Number(idElement)+1}"`, `id="down${0}"`);
                                    newElementIds =newElementIds.replace(`id="up${Number(idElement)+1}"`, `id="up${0}"`);
                                    newElementIds =newElementIds.replace(`id="delete${Number(idElement)+1}"`, `id="delete${0}"`);
                                localStorage.setItem(0, newElementIds);
                                localStorage.removeItem(localStorage.length - 1);
                                document.getElementById(Number(idElement)+1).setAttribute('id',idElement);
                                $(`#color${Number(idElement)+1}`).attr('id',`color${0}`);
                                $(`#down${Number(idElement)+1}`).attr('id',`down${0}`);
                                $(`#up${Number(idElement)+1}`).attr('id',`up${0}`);
                                $(`#delete${Number(idElement)+1}`).attr('id',`delete${0}`);
                               thisParent.parentElement.remove();
                               let index = eventsId.indexOf(localStorage.length-1);
                                eventsId.splice(index,1);

                            }  else {

                                 for (let i = 0; i < localStorage.length-1; i++) {
                                    let newElementPlace = localStorage.getItem(i+1);
                                    let newElementIds = newElementPlace.replace(`id="${i+1}"`, `id="${i}"`);
                                        newElementIds =newElementIds.replace(`id="color${i+1}"`, `id="color${i}"`);
                                        newElementIds =newElementIds.replace(`id="down${i+1}"`, `id="down${i}"`);
                                        newElementIds =newElementIds.replace(`id="up${i+1}"`, `id="up${i}"`);
                                        newElementIds =newElementIds.replace(`id="delete${i+1}"`, `id="delete${i}"`);
                                    localStorage.setItem(i, newElementIds);
                                    document.getElementById(i+1).setAttribute('id',i);
                                    $(`#color${i+1}`).attr('id',`color${i}`);
                                    $(`#down${i+1}`).attr('id',`down${i}`);
                                    $(`#up${i+1}`).attr('id',`up${i}`);
                                    $(`#delete${i+1}`).attr('id',`delete${i}`);
                                   
                                 }
                                 localStorage.removeItem(localStorage.length - 1);
                                 thisParent.parentElement.remove();
                                   let index = eventsId.indexOf(localStorage.length-1);
                                    eventsId.splice(index,1);

                             }

                        } else if (idInsideElement == localStorage.length - 1) {

                            localStorage.removeItem(thisParent.getAttribute('id'));
                            thisParent.parentElement.remove();
                            let index = eventsId.indexOf(localStorage.length-1);
                            eventsId.splice(index,1);

                        } else {

                            for (let i = Number(idElement); i < localStorage.length-1; i++) {
                                let newElementPlace = localStorage.getItem(i+1);
                                let newElementIds = newElementPlace.replace(`id="${i+1}"`, `id="${i}"`);
                                    newElementIds =newElementIds.replace(`id="color${i+1}"`, `id="color${i}"`);
                                    newElementIds =newElementIds.replace(`id="down${i+1}"`, `id="down${i}"`);
                                    newElementIds =newElementIds.replace(`id="up${i+1}"`, `id="up${i}"`);
                                    newElementIds =newElementIds.replace(`id="delete${i+1}"`, `id="delete${i}"`);
                                localStorage.setItem(i, newElementIds);
                                document.getElementById(i+1).setAttribute('id',i);
                                $(`#color${i+1}`).attr('id',`color${i}`);
                                $(`#down${i+1}`).attr('id',`down${i}`);
                                $(`#up${i+1}`).attr('id',`up${i}`);
                                $(`#delete${i+1}`).attr('id',`delete${i}`);
                               
                             }
                             localStorage.removeItem(localStorage.length - 1);
                             thisParent.parentElement.remove();
                               let index = eventsId.indexOf(localStorage.length-1);
                                eventsId.splice(index,1);

                        }
                    } else {
                        localStorage.removeItem(thisParent.getAttribute('id'));
                        let index = eventsId.indexOf(localStorage.length-1);
                            eventsId.splice(index,1);         
                            thisParent.parentElement.remove();
                    }
                }
            });
    });       
}else{
    eventsId.push(parentDivId);
}
}