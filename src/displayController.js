//import { createCheckItem, editCheckObject } from "./createCheckItem"
import { addAttributes} from "./utilities"
import { createBarProject, editProjectObject} from "./projects"


//----CHECK ITEM-----
const checkItem = (() => {

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
            }
            else{
                check.style.display="none";
            }
        })
    }

    return {
        changeCheckItems,
    }

})();


//----PROJECT-----

const project = (() => {

    const addedProjectsDiv = document.querySelector("#added-projects-div");
    const addProjectDiv = document.querySelector("#add-project-div");
    const addProjectBtn = document.querySelector("#add-project-span");
    let projectList = document.querySelectorAll(".project-item");
    let currentProject ="x2-trip";

    addProjectBtn.addEventListener("click", showInput);
    addProjectDiv.addEventListener("click", stopProp);
    window.addEventListener("click",hideInput);
    projectList.forEach((project) => project.addEventListener("click",navigateProject));

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
    }

    const getCurrentProject = () => currentProject;

    return {
        getCurrentProject,
    }

})();




export {checkItem,project};