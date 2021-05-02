//import { createCheckItem, editCheckObject } from "./createCheckItem"
import { addAttributes, addTagsToDiv} from "./utilities"
import { createBarProject, editProjectObject} from "./projects"
import { editCheckObject } from "./createCheckItem";
import Picker from 'vanilla-picker';


//----CHECK ITEM-----
const checkItem = (() => {
    //TOGGLE
    let toggleChecks = document.querySelector("#check-toggle");
    toggleChecks.addEventListener("click",toggleCheckItems)
    

    //CHECK
    let allChecks = document.querySelectorAll(".check-item");
    let checkBoxs = document.querySelectorAll(".check-box");
    let allChecksDiv = document.querySelector("#main-checklist-div");
    let checkItemsTop = document.querySelectorAll(".check-item-top");
    let icons = document.querySelectorAll(".check-icon");
    let previousExpanded=null;

    //EDITS
    //CHECK ITEM TOOLTIP SEND
    let checkTitleSend = document.querySelectorAll(".check-btn-title-send");
    let checkTagSend = document.querySelectorAll(".check-btn-tag-send");
    let checkDueSend = document.querySelectorAll(".check-btn-due-send");
    let checkPrioritySend = document.querySelectorAll(".check-btn-priority-send");
    let checkIconSend = document.querySelectorAll(".check-btn-icon-send");
    let checkEmojiSelect = document.querySelectorAll(".select-emoji-picker");
    let currentEmoji="";

    //DELETE
    let checkDelete = document.querySelectorAll(".check-edit-btn-delete");

    //ORGANIZE
    let dropEntry = document.querySelector("#dropdown-entry");
    let dropPriority = document.querySelector("#dropdown-priority");
    let dropDue = document.querySelector("#dropdown-deadline");
    //
    let organizeEntry = (event) => organize(event,"entry");
    dropEntry.addEventListener("click",organizeEntry);
    let organizePriority = (event) => organize(event,"priority");
    dropPriority.addEventListener("click",organizePriority);
    let organizeDue = (event) => organize(event,"due");
    dropDue.addEventListener("click",organizeDue);
    


    //Update NodeLists When New Check Item
    window.addEventListener('addedCheckItem', function (e) {
        updateVariables();
        addEventListeners();
    });
    const updateVariables = () => {
        console.log("updating variables");
        allChecks = document.querySelectorAll(".check-item");
        checkItemsTop = document.querySelectorAll(".check-item-top");
        icons = document.querySelectorAll(".check-icon");
        checkTitleSend = document.querySelectorAll(".check-btn-title-send");
        checkTagSend = document.querySelectorAll(".check-btn-tag-send");
        checkDueSend = document.querySelectorAll(".check-btn-due-send");
        checkPrioritySend = document.querySelectorAll(".check-btn-priority-send");
        checkIconSend = document.querySelectorAll(".check-btn-icon-send");
        checkEmojiSelect = document.querySelectorAll(".select-emoji-picker");
        checkBoxs = document.querySelectorAll(".check-box");
        checkDelete = document.querySelectorAll(".check-edit-btn-delete");
    }
    

    //ADD/UPDATE EVENT LISTENERS
    let sendTitle = (event) => applySend(event,"title");
    let sendTag = (event) => applySend(event,"tag");
    let sendDue = (event) => applySend(event,"due");
    let sendPriority = (event) => applySend(event,"priority");
    let sendIcon = (event) => applySend(event,"icon");
    addEventListeners();
    function addEventListeners (){
        checkItemsTop.forEach((checkItem) =>{
            checkItem.addEventListener("click", changeItemSize);
        });
        checkTitleSend.forEach((send) => {
            send.addEventListener("click",sendTitle);
        });
        checkTagSend.forEach((send) => {
            send.addEventListener("click",sendTag);
        });
        checkDueSend.forEach((send) => {
            send.addEventListener("click",sendDue);
        });
        checkPrioritySend.forEach((send) => {
            send.addEventListener("click",sendPriority);
        });
        checkEmojiSelect.forEach((emojiSelector) => {
            emojiSelector.addEventListener('emoji-click', event => {
                currentEmoji = event.detail["emoji"].unicode;
            });
        })
        checkIconSend.forEach((send) => {
            send.addEventListener("click",sendIcon);
        });
        checkBoxs.forEach((checkBox) => {
            checkBox.addEventListener("click",flipCheckBox);
        })
        checkDelete.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click",deleteCheckItem);
        })
        console.log("Updated Event Listeners");
    }

    //RESIZE CHECK-ITEM WHEN CLICKED
    function changeItemSize(event) {
        let itemId = event.currentTarget.getAttribute("id");
        itemId=itemId[1];
        let itemExpand = document.querySelector(`#x${itemId[0]}-expand-div`);
        let itemExpandState = itemExpand.style.display;
        if (itemExpandState=="none"){
            if (previousExpanded!=null){
                previousExpanded.style.display="none";
            }
            previousExpanded=itemExpand;
            itemExpand.style.display="block";
        }
        else{
            itemExpand.style.display="none";
        }
    }

    //TOGGLE -> SHOW/HIDE CHECKED
    function toggleCheckItems(){
        allChecks = document.querySelectorAll(".check-item");
        if (toggleChecks.getAttribute("data-checked")=="true"){
            toggleChecks.setAttribute("data-checked","false");
        }
        else{
            toggleChecks.setAttribute("data-checked","true");
        }
        allChecks.forEach((check) => {
            let checkId =check.getAttribute("id");
            let checkBox = document.querySelector(`#x${checkId[1]}-check-box`)
            if (checkBox.getAttribute("data-checked")=="true" && toggleChecks.getAttribute("data-checked")=="true"){
                check.style.display= "block";
            }
            else if (checkBox.getAttribute("data-checked")=="true" && toggleChecks.getAttribute("data-checked")=="false"){
                check.style.display="none";
            }
        })
    }

    //REPLACE CHECKBOX COLORS
    const replaceCheckColor= (projectId, color) => {
        allChecks = document.querySelectorAll(".check-item");
        allChecks.forEach((check) => {
            let checkId =check.getAttribute("id");
            if (editCheckObject.returnCheckAt(checkId[1]).project==projectId){
                let checkBox = document.querySelector(`#x${checkId[1]}-check-box`)
                if (checkBox.getAttribute("data-checked")=="true"){
                    checkBox.style.color= color;
                }
            }
            
            
        })
    }


    //CHECK/UNCHECK ITEMS
    function flipCheckBox(event){
        console.log("flip check box");
        let itemId = event.currentTarget.getAttribute("id");
        itemId=itemId[1];
        let projectAttribute = editCheckObject.returnCheckAt(itemId).project;
        console.log("item is in: ",editCheckObject.returnCheckAt(itemId).project)
        let projectColor = editProjectObject.returnProperty(projectAttribute[1],"color");
        console.log("id and color",itemId,projectColor);
        if (editCheckObject.returnCheckAt(itemId).checked==false){
            editCheckObject.updateCheckFor(itemId,"checked",true);
            event.currentTarget.setAttribute("data-checked","true");
            event.currentTarget.setAttribute("style",projectColor);
        }
        else{
            editCheckObject.updateCheckFor(itemId,"checked",false);
            event.currentTarget.setAttribute("data-checked","false");
            event.currentTarget.setAttribute("style","color: #e2d7be");
        }
    }

    //SHOW APPROPRIATE CHECK ITEMS
    const changeCheckItems = (project) => {
        let allChecks = document.querySelectorAll(".check-item");
        console.log(project);
        allChecks.forEach((check) => {
            if (check.getAttribute("data-project")==project || (project=="x0-all")){
                check.style.display= "block";
            }
            else if (project=="x1-today"){
                function completeWithZero(digit){
                    if (digit.toString().length==1){
                        digit="0"+digit;
                    }
                    return digit;
                }
                const now = new Date();
                let day = now.getDate();
                let month = now.getMonth()+1;
                day=completeWithZero(day);
                month=completeWithZero(month);
                let year = now.getFullYear();
                console.log("today is: ",`${year}-${month}-${day}`);
                let checkId = check.getAttribute("id");
                checkId=checkId[1];
                let checkDate=editCheckObject.returnCheckAt(checkId).due;
                if (checkDate==`${year}-${month}-${day}`){
                    check.style.display= "block";
                }
            }
            else{
                check.style.display="none";
            }
        })
    }

    //DELETE CHECK ITEM
    function deleteCheckItem (event){
        console.log(event.currentTarget.getAttribute("id"));
        let itemId = event.currentTarget.getAttribute("id");
        itemId= itemId[1];
        let checkItem = document.querySelector(`#x${itemId}-check-item`);
        console.log(checkItem);
        allChecksDiv.removeChild(checkItem);
        console.log("deleting: ",itemId);
        editCheckObject.deleteCheckAt(itemId);
    }

    //DELETE ALL CHECK ITEMS FROM A PROJECT
    const deleteChecks = (project) => {
        let allChecks = document.querySelectorAll(".check-item");
        allChecks.forEach((check) => {
            if (check.getAttribute("data-project")==project){
                allChecksDiv.removeChild(check);
            }
        })
    }

    // // //

    //EDIT CHECK
     
    //TITLE/TAGS
    function applySend (event,type){
        let myText=null;
        console.log("Update: ",type);
        let sendIdFull = event.currentTarget.getAttribute("id");
        let sendId = sendIdFull[1];
        if (type!="priority" && type!="icon"){
            myText = document.querySelector(`#x${sendId}-check-${type}-input`).value;
        }
        if (myText!="" || type=="tag" || type=="priority"){
            let myOriginal = document.querySelector(`#x${sendId}-${type}`);
            if (type=="title"){
                editCheckObject.updateCheckFor(sendId,type,myText);
                myOriginal.textContent = myText;
            }
            else if (type=="tag"){
                editCheckObject.updateCheckFor(sendId,type,myText.split(" "));
                myOriginal.textContent = "";
                addTagsToDiv(myOriginal,myText.split(" "));
                console.log(editCheckObject.returnCheckAt(sendId).tags);
            }
            else if (type=="due"){
                editCheckObject.updateCheckFor(sendId,type,myText);
                myOriginal.textContent = "";
                myOriginal.textContent = myText;
            }
            else if (type=="priority"){
                myText= document.querySelector(`input[name="x${sendId}-check-priority-input"]:checked`).value;
                editCheckObject.updateCheckFor(sendId,type,myText);
                myOriginal.textContent = "";
                myOriginal.textContent = myText;
            }
            else if (type=="icon"){
                myText= currentEmoji;
                editCheckObject.updateCheckFor(sendId,type,myText);
                myOriginal.textContent = "";
                myOriginal.textContent = myText;
            }
        }
    }

    //ORGANIZE
    function organize(event,type){
        console.log("organize by:",type);
        allChecks.forEach((checkItem) => {
            let checkId = checkItem.getAttribute("id");
            checkId=checkId[1];
            let organizeUsing =checkId;
            if (type=="priority"){
                organizeUsing = (5- Number(editCheckObject.returnCheckAtString(checkId).priority)).toString();
            }
            else if (type=="due"){
                let myDate =editCheckObject.returnCheckAtString(checkId).due;
                let dateArray = myDate.split("-");
                let total="";
                console.log("dateArray: ",dateArray);
                for (let i=0;i<dateArray.length;i++){
                    total=total+ dateArray[i];
                    console.log(total);
                }
                organizeUsing=total;
                if (total=="000000"){
                    console.log("am here")
                    organizeUsing="100000000";
                }
            }
            checkItem.style.order=organizeUsing;
        })
    }
    

    return {
        changeCheckItems,
        deleteChecks,
        replaceCheckColor,
    }

})();


//----PROJECT-----

const project = (() => {
    //ADD
    let addSpan = document.querySelector("#add-check-span");

    //PROJECT
    let addedProjectsDiv = document.querySelector("#added-projects-div");
    const addProjectDiv = document.querySelector("#add-project-div");
    const addProjectBtn = document.querySelector("#add-project-span");
    let projectList = document.querySelectorAll(".project-item");
    let deleteProjectBtn =document.querySelector("#delete-project-btn");
    let currentProject ="x2-trip";
    

    addProjectBtn.addEventListener("click", showInput);
    addProjectDiv.addEventListener("click", stopProp);
    window.addEventListener("click",hideInput);
    projectList.forEach((project) => project.addEventListener("click",navigateProject));
    deleteProjectBtn.addEventListener("click", deleteProject);
    

    function showInput (){
        if (document.querySelector('.project-input-name') == null) {
            console.log("input new project");
            let inputProject = document.createElement("input");
            addAttributes(inputProject,[["type","text"],["class","project-input-name"],["maxlength","13"],["placeholder","Project"]]);
            addProjectDiv.appendChild(inputProject);
        }
    }

    function hideInput (){
        if (document.querySelector('.project-input-name') !== null) {
            let inputProject= document.querySelector(".project-input-name");
            let title=inputProject.value;
            updateProjectList(title);
            //Remove Input Option
            addProjectDiv.removeChild(inputProject);
        }
    }

    function updateProjectList (title){
        //Add Project to List
        editProjectObject.addNewProject(title);
        let projectListItem = createBarProject(editProjectObject.mostRecentId());
        addedProjectsDiv.appendChild(projectListItem);
        //Update NodeList
        projectList = document.querySelectorAll(".project-item");
        projectList.forEach((project) => project.addEventListener("click",navigateProject)); //NOTE: can make just add to new one
    }

    function stopProp(event){
        event.stopPropagation();
    }

    function navigateProject(event){
        let projectFullId = event.currentTarget.getAttribute("id");
        let projectId =projectFullId[1];
        //Change Page
        let mainTitle = document.querySelector("#main-title");
        mainTitle.textContent = editProjectObject.returnProperty(projectId,"title");
        let mainInfo = document.querySelector("#main-info");
        mainInfo.textContent = editProjectObject.returnProperty(projectId,"info");
        // Show Appropriate Check Items
        currentProject = editProjectObject.returnProperty(projectId,"attribute");
        checkItem.changeCheckItems(currentProject)
        //NOTE: Hide Delete Button if in x0-all or x-1-today
        deleteProjectBtn.style.display="block";
        addSpan.style.display="block";
        if (currentProject=="x0-all" || currentProject=="x1-today"){
            deleteProjectBtn.style.display="none";
            addSpan.style.display="none";
        }
    }

    const getCurrentProject = () => currentProject;

    function deleteProject (){
        if (currentProject!= "x0-all" && currentProject!= "x0-today"){
            //Remove From List
            let listProject = document.querySelector(`#${currentProject}-h3`);
            console.log(`${currentProject}-h3`);
            console.log(listProject);
            addedProjectsDiv.removeChild(listProject);
            //Delete all Check Items from That Project
            checkItem.deleteChecks(currentProject);
            //Naviagte to All
            document.querySelector('#x0-all-h3').click();
        }
        
    }

    return {
        getCurrentProject,
    }

})();



//----EDITS-----

const editDom = (() => {

    //MAIN TITLE
    let mainTitleDiv = document.querySelector("#main-title-div");
    let mainTitle = document.querySelector("#main-title");
    let mainTitleInput = document.querySelector("#main-title-input");
    //MAIN INFO
    let mainInfoDiv = document.querySelector("#main-info-div");
    let mainInfo = document.querySelector("#main-info");
    let mainInfoInput = document.querySelector("#main-info-input");
    //COLOR
    let colorProjectBtn = document.querySelector("#color-title-span");
    let colorProjectHolder = document.querySelector("#color-title-holder");
    
    


    //EDIT PROJECT
    //Edit Project Title
    mainTitleDiv.addEventListener("click", stopProp);
    let dblTitle = (event) => editText(event,mainTitleInput,"title");
    mainTitle.addEventListener("dblclick", dblTitle);
    //Edit Project Info
    mainInfoDiv.addEventListener("click", stopProp);
    let dblInfo = (event) => editText(event,mainInfoInput,"info");
    mainInfo.addEventListener("dblclick", dblInfo);
    //
    window.addEventListener("click",hideInput);



    let amEditingDbl =false;
    let currentProject = "x2-trip";
    let currentProjectId = currentProject[1];
    let currentText = null;
    let currentInput = null;
    let currentType = null;


    function editText (event,input,type){
        amEditingDbl= true;
        //Display None on Title and Replace with Input
        console.log("I double clicked on text");
        event.currentTarget.style.display = "none";
        currentProject = project.getCurrentProject();
        currentProjectId = currentProject[1];
        let myText = editProjectObject.returnProperty(currentProjectId, type);
        input.placeholder=myText;
        input.style.display ="block";
        //Set Currents for HideInput
        currentText=event.currentTarget;
        currentInput=input;
        currentType=type;
    };

    function hideInput (){
        if (amEditingDbl==true){
            amEditingDbl=false;
            let newText=currentInput.value;
            currentInput.value="";
            currentInput.style.display="none";
            currentText.style.display="block";
            //Update Text
            if (newText!=""){
                console.log("new text: ",newText);
                editProjectObject.updateProjectFor(currentProjectId,currentType,newText);
                currentText.textContent= newText;
                //Update Title In List (Only for Main-Title!)
                if (currentText==mainTitle){
                    updateProjectListTitle(currentProject, newText);
                }
            }
        }
    }

    function stopProp(event){
        event.stopPropagation();
    }

    const updateProjectListTitle = (myProject, newTitle) => {
        let listTitle = document.querySelector(`#${myProject}-h3`);
        let listTitleSpan =document.querySelector(`[id=${myProject}-h3] > span`);
        listTitle.textContent= newTitle;
        listTitle.prepend(listTitleSpan);
    };


    //PROJECT COLOR
    let picker = new Picker(colorProjectHolder);
    picker.onDone = function(myColor) {
        currentProject=project.getCurrentProject();
        currentProjectId=currentProject[1];
        let chosenColor=myColor.rgbaString;
        //Change Circle Icon
        editProjectObject.updateProjectFor(currentProjectId,"color",`color: ${chosenColor}`);
        let projectAttribute = editProjectObject.returnProperty(currentProjectId,"attribute");
        let projectList = document.querySelector(`#${projectAttribute}-h3`);
        projectList.firstChild.style.color=chosenColor;
        //Update Check Box's to Correct color
        checkItem.replaceCheckColor(projectAttribute,chosenColor);

    };
    



})();




export {checkItem,project};