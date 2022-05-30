//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.




// var taskInput=document.getElementById("new-task");//Add a new task.


var taskInput=document.querySelector(".add-task__input");
var addButton=document.querySelector(".add-task__btn");//first button
var incompleteTaskHolder=document.querySelector(".incomplete-tasks__list");//ul of #incomplete-tasks
var completedTasksHolder=document.querySelector(".completed-tasks__list");//ul of #completed-tasks

//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listItem.className = 'incomplete-tasks__item';

    label.innerText=taskString;
    label.className='incomplete-tasks__label';


    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className='incomplete-tasks__checkbox';
    editInput.type="text";
    editInput.className="incomplete-tasks__input";


    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="incomplete-tasks__btn incomplete-tasks__btn_edit";


    deleteButton.className="incomplete-tasks__btn incomplete-tasks__btn_delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className = 'incomplete-tasks__img'
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn;
    listItem.querySelectorAll('button').forEach(element=>{
        if(element.classList.contains('incomplete-tasks__btn_edit') || element.classList.contains('completed-tasks__btn_edit')) {
            editBtn = element;
        }
    })
    var containsClassIncomplete=listItem.classList.contains("incomplete-tasks__item_edit");
    var containsClassCompleted=listItem.classList.contains("completed-tasks__item_edit");
    //If class of the parent is .edit-mode
    if(containsClassIncomplete || containsClassCompleted){

        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;

        editBtn.innerText="Edit";
    } else {
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    if (containsClassIncomplete) {
        listItem.classList.toggle("incomplete-tasks__item_edit");
    } else if (containsClassCompleted) {
        listItem.classList.toggle("completed-tasks__item_edit");
    } else {
        var itemClass = listItem.classList[0];
        listItem.classList.add(`${itemClass}_edit`);
    }
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}

//Function for changing item's status in the class names

function changeStatus (item, statusFrom, statusTo) {
    if (item.classList.contains(`${statusFrom}__item_edit`)) {
        item.classList = '';
        item.classList.add(`${statusTo}__item`);
        item.classList.add(`${statusTo}__item_edit`);
    } else {
        item.classList = '';
        item.classList.add(`${statusTo}__item`);
    }
    var children = item.querySelectorAll('*')
    children.forEach(node => {
        if (node.nodeName === 'BUTTON') {
            var mainName = node.classList[0].split('__')[1];
            var modName = node.classList[1].split('__')[1];
            node.classList = '';
            node.classList.add(`${statusTo}__${mainName}`);
            node.classList.add(`${statusTo}__${modName}`);
        } else {
            var classElem = node.classList[0].split('__')[1];
            node.classList.remove(node.classList[0])
            node.classList = `${statusTo}__${classElem}`;
        }
    });
    return item;
}

//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    listItem = changeStatus (listItem, 'incomplete-tasks', 'completed-tasks');
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
    listItem = changeStatus (listItem, 'completed-tasks', 'incomplete-tasks');
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton, deleteButton;
    taskListItem.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('incomplete-tasks__btn_edit') || button.classList.contains('completed-tasks__btn_edit')) {
            editButton = button;
        } else if (button.classList.contains('incomplete-tasks__btn_delete') || button.classList.contains('completed-tasks__btn_delete')) {
            deleteButton = button;
        }
    });


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}


let addSectionHeading = document.querySelector('.add-task__heading');

addSectionHeading.addEventListener('click', ()=>{
    document.querySelector('.add-task__input').focus();
})
// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.