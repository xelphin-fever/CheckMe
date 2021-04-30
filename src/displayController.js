//import { createCheckItem, editCheckObject } from "./createCheckItem"
import { addAttributes} from "./utilities"
import { createBarProject, editProjectObject} from "./projects"


//----CHECK ITEM-----
const checkItem = (() => {

    let allChecksDiv = document.querySelector("#main-checklist-div");
    let checkItemsTop = document.querySelectorAll(".check-item-top");
    let icons = document.querySelectorAll(".check-icon");
    let previousExpanded=null;

    //Update NodeLists When New Check Item
    window.addEventListener('addedCheckItem', function (e) {
        updateVariables();
        addEventListeners();
    });
    const updateVariables = () => {
        console.log("updating variables");
        checkItemsTop = document.querySelectorAll(".check-item-top");
        icons = document.querySelectorAll(".check-icon");
        console.log(checkItemsTop);
    }
    

    //RESIZE CHECK-ITEM WHEN CLICKED
    addEventListeners();
    function addEventListeners (){
        checkItemsTop.forEach((checkItem) =>{
            checkItem.addEventListener("click", changeItemSize);
        })
    }
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

    //Edit Project Title
    mainTitleDiv.addEventListener("click", stopProp);
    let dblTitle = (event) => editText(event,mainTitleInput,"title");
    mainTitle.addEventListener("dblclick", dblTitle);
    //Edit Project Info
    mainInfoDiv.addEventListener("click", stopProp);
    let dblInfo = (event) => editText(event,mainInfoInput,"info");
    mainInfo.addEventListener("dblclick", dblInfo);
    
    window.addEventListener("click",hideInput);

    let amEditing =false;
    let currentProject = "x2-trip";
    let currentProjectId = currentProject[1];
    let currentText = null;
    let currentInput = null;
    let currentType = null;


    function editText (event,input,type){
        amEditing= true;
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
        if (amEditing==true){
            amEditing=false;
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