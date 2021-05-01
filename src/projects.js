
import { addAttributes } from "./utilities"

const createBarProject = (id) => {
    console.log("Create New Project");

    //Create H3 Element
    let projectElement = document.createElement("h3");
    addAttributes(projectElement,[["id",`${allProjects[id].attribute}-h3`],["class","project-item"]]);
    projectElement.textContent=allProjects[id].title;

    //Create SPAN Element
    let projectSpan = document.createElement("span");
    addAttributes(projectSpan,[["class","material-icons md-36"]]);
    projectSpan.innerHTML=allProjects[id].icon;

    //Append
    projectElement.prepend(projectSpan);

    return projectElement;

}

const editProjectObject = (() => {
    let idCount=4;
    
    //Add New Project Item
    const addNewProject = (title) => {
        let newItem = {
            title: title,
            icon:"&#xE061;",
            color:"black",
            info:"Double-Click to Edit Me (and the Title)",
            attribute:`x${idCount}-${title.toLowerCase()}`,
            removable: true,
        }
        allProjects[idCount.toString()]=newItem;
        idCount++;
    }

    const returnProjectAt = (id) =>{
        return allProjects[id.toString()];
    }
    const returnProperty = (id, property) => {
        return allProjects[id.toString()][property];
    }

    const updateProjectFor = (id, category, newValue) => {
        allProjects[id.toString()][category] = newValue;
    }

    const mostRecentId = () => {
        return idCount-1;
    }

    return {
        addNewProject,
        returnProjectAt,
        returnProperty,
        updateProjectFor,
        mostRecentId,
      };


  })();


export {createBarProject, editProjectObject};











let allProjects = {
    "0": {
        title: "All",
        icon: "&#xE156;",
        color: "color: black",
        info: "All To-Dos Are Listed Here",
        attribute: "x0-all",
        removable: false,
    },
    "1": {
        title: "Today",
        icon: "&#xE8DF;",
        color: "color: black",
        info: "These are the To-Dos for Today",
        attribute: "x1-today",
        removable: false,
    },
    "2": {
        title: "Trip",
        icon: "&#xE061;",
        color: "color:rgb(175, 134, 134);",
        info: "Double-Click to Edit Me (and the Title)",
        attribute: "x2-trip",
        removable: true,
    },
    "3": {
        title: "Work",
        icon: "&#xE061;",
        color: "color:rgb(175, 134, 134);",
        info: "Double-Click to Edit Me (and the Title)",
        attribute: "x3-work",
        removable: true,
    },
}