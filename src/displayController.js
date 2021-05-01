//import { createCheckItem, editCheckObject } from "./createCheckItem"
import { addAttributes, addTagsToDiv} from "./utilities"
import { createBarProject, editProjectObject} from "./projects"
import { editCheckObject } from "./createCheckItem";


//----CHECK ITEM-----
const checkItem = (() => {

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

    
    

    //Update NodeLists When New Check Item
    window.addEventListener('addedCheckItem', function (e) {
        updateVariables();
        addEventListeners();
    });
    const updateVariables = () => {
        console.log("updating variables");
        checkItemsTop = document.querySelectorAll(".check-item-top");
        icons = document.querySelectorAll(".check-icon");
        checkTitleSend = document.querySelectorAll(".check-btn-title-send");
        checkTagSend = document.querySelectorAll(".check-btn-tag-send");
        checkDueSend = document.querySelectorAll(".check-btn-due-send");
        checkPrioritySend = document.querySelectorAll(".check-btn-priority-send");
        checkIconSend = document.querySelectorAll(".check-btn-icon-send");
        checkEmojiSelect = document.querySelectorAll(".select-emoji-picker");
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

    //SHOW APPROPRIATE CHECK ITEMS
    const changeCheckItems = (project) => {
        let allChecks = document.querySelectorAll(".check-item");
        console.log(project);
        allChecks.forEach((check) => {
            if (check.getAttribute("data-project")==project || (project=="x0-all")){
                check.style.display= "block";
                //Add Toggle logic (add checked data-attribute)
                //Choose to either display all (from here) or just unChecked
            }
            else{
                check.style.display="none";
            }
        })
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
        if (type!="priority" || type!="icon"){
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

    return {
        changeCheckItems,
        deleteChecks,
    }

})();


//----PROJECT-----

const project = (() => {

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
        if (currentProject=="x0-all" || currentProject=="x1-today"){
            deleteProjectBtn.style.display="none";
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


    



})();




export {checkItem,project};