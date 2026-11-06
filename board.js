const board = document.getElementById("boards")
const addboardfield = document.getElementById("add-new-board-field")
const addboardbtn = document.getElementById("add-new-board-btn")
const boardContainer = document.getElementById("BoardContainer")
const headingBoard = document.getElementById('card-name')
const inputfield = document.getElementById('input-field')
const workspace = document.querySelector(".drop-zone")
const boards = document.querySelectorAll('.boards')



//Event Listener
addboardbtn.addEventListener("click",addNewBoard)



const gapSlider = document.getElementById("gap-slider");
const gapValueText = document.getElementById("gap-value");


gapSlider.addEventListener("input", (e) => {
    const gapVal = e.target.value;
    workspace.style.setProperty("--board-gap", `${gapVal}px`);
    gapValueText.textContent = `${gapVal}px`;
});



//Adding New Boards
function addNewBoard(){
    const BoardName = addboardfield.value
    console.log(BoardName)
    if (BoardName === "") return;

    const uniqueId = "board-" + Date.now();


    const newboard = document.createElement('div')
    newboard.classList.add("boards");
    newboard.id = uniqueId;
    boardContainer.appendChild(newboard)
    console.log(uniqueId)
    
    const boardheadspace = document.createElement('div')
    boardheadspace.classList.add("heading-bar")
    newboard.appendChild(boardheadspace)

    const gripSection = document.createElement('div')
    gripSection.classList.add("grip")
    boardheadspace.appendChild(gripSection)
    
    const grip = document.createElement('i')
    grip.classList.add("fa-solid","fa-grip") 
    gripSection.appendChild(grip)

    const boardTitle = document.createElement('h1')
    boardTitle.textContent = BoardName
    boardheadspace.appendChild(boardTitle)


    const horizontalLine = document.createElement('hr')
    newboard.appendChild(horizontalLine)


    const list = document.createElement('div')
    list.classList.add("list")
    newboard.append(list)


    const inputfield = document.createElement('div')
    const input = document.createElement('input')
    const button = document.createElement('button')
    
    button.classList.add('add-card-btn')

    input.type = 'text';
    input.placeholder = 'Add card...'
    button.textContent = "+"
    inputfield.append(input,button)

    inputfield.classList.add("input-field")
    newboard.appendChild(inputfield)
    addboardfield.value = "";

    return list
}


Sortable.create(boardContainer,{
    handle:'.fa-grip',
    animation:150,
    ghostClass:'dragging'
})


//Events Delegation
boardContainer.addEventListener('click',(event)=>{
    const btn = event.target.closest('button');
    if (!btn) return; 
    const parentContainer = btn.closest('.boards'); 
    if (parentContainer) {
        const parentId = parentContainer.id;
        console.log("The clicked button's parent ID is:", parentId);

        addCardToBoard(parentContainer);
    }
})



function addCardToBoard(parentContainer){
    const input = parentContainer.querySelector('input')
    const list = parentContainer.querySelector('.list')

    const value = input.value
    console.log(value);
    console.log(list);

    const card = document.createElement('div')
    card.classList.add('card')
    const CarduniqueId =  'card-'+ Date.now() 
    card.id = CarduniqueId

    list.appendChild(card)
    card.textContent = input.value;

    input.value = " "
}