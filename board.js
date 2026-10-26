const board = document.getElementById("boards")
const addboardfield = document.getElementById("add-new-board-field")
const addboardbtn = document.getElementById("add-new-board-btn")
const boardContainer = document.getElementById("BoardContainer")
const headingBoard = document.getElementById('card-name')
const inputfield = document.getElementById('input-field')
const workspace = document.querySelector(".drop-zone")
const boards = document.querySelectorAll('.boards')
addboardbtn.addEventListener("click",addNewBoard)
let draggedboard = null

///making Board Draggable
function makeBoardDrag(board){
    board.setAttribute("draggable","true");

    board.addEventListener("dragstart",(e)=>{
        draggedboard = board;
        board.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
    });
    board.addEventListener("dragend",()=>{
        board.classList.remove("dragging");
        draggedboard=null;
    });

}
boardContainer.addEventListener("dragover",(e)=>{
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const workspaceRect = workspace.getBoundingClientRect();
    const threshold = 85;
    const scrollSpeed = 30;

    if(e.clientX < workspaceRect.left + threshold){
        workspace.scrollLeft -= scrollSpeed;
    }else if(e.clientX > workspaceRect.right - threshold){
        workspace.scrollLeft += scrollSpeed;
    }

    const afterElement = getDragAfterElement(boardContainer, e.clientX);
    if(afterElement == null){
        boardContainer.appendChild(draggedboard)
    }else{
        boardContainer.insertBefore(draggedboard,afterElement);
    }

});


//Where is must go
function getDragAfterElement(container,x){
    const draggableElements = [...container.querySelectorAll(".boards:not(.dragging)")]
    return draggableElements.reduce((closest,child) =>{
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width /2;

        if(offset < 0 && offset > closest.offset){
            return {offset:offset,element:child};
        }else{
            return closest;
        }
    },{offset:Number.NEGATIVE_INFINITY}).element;
}
document.querySelectorAll(".boards").forEach(makeBoardDrag)


//Adding New Boards
function addNewBoard(){
    const BoardName = addboardfield.value
    console.log(BoardName)
    if (BoardName === "") return;

    const uniqueId = "board-" + Date.now();

    const newboard = document.createElement('div')
    newboard.classList.add("boards");
    newboard.setAttribute("draggable","true")
    newboard.id = uniqueId;

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

    const inputfield = document.createElement('div')
    const input = document.createElement('input')
    const button = document.createElement('button')
    input.type = 'text';
    input.placeholder = 'Add card...'
    button.textContent = "+"
    inputfield.append(input,button)

    inputfield.classList.add("input-field")
    newboard.appendChild(inputfield)

    makeBoardDrag(newboard)


    boardContainer.appendChild(newboard)
    addboardfield.value = "";
}


const gapSlider = document.getElementById("gap-slider");
const gapValueText = document.getElementById("gap-value");


gapSlider.addEventListener("input", (e) => {
    const gapVal = e.target.value;
    workspace.style.setProperty("--board-gap", `${gapVal}px`);
    gapValueText.textContent = `${gapVal}px`;
});


