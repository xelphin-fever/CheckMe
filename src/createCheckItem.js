
import { appendChildren, addAttributes, makeEditButton } from "./utilities"


//---EDIT OBJECT: allCheckItems---
const editCheckObject = (() => {
    let idCount=2;
    
    //Add New Check Item
    const addNewCheck = (title,checked,icon,tags,info,due,priority,project) => {
        let newItem = {
            title: " "+title,
            checked:checked,
            icon:icon,
            tags:tags,
            info:info,
            due:due,
            priority:priority,
            project:project,
        }
        allCheckItems[idCount.toString()]=newItem;
        idCount++;
    }

    const returnCheckAt = (id) =>{
        return allCheckItems[id.toString()];
    }

    const updateCheckFor = (id, category, newValue) => {
        allCheckItems[id.toString()][category] = newValue;
    }

    const mostRecentId = () => {
        return idCount-1;
    }

    return {
        addNewCheck,
        returnCheckAt,
        updateCheckFor,
        mostRecentId,
      };


  })();






//---CREATE A CHECK ITEM---

const createCheckItem = (id) => {
    const checklist = document.querySelector("#main-checklist-div");

    //CHECK ITEM
    let checkItem = document.createElement("div");
    addAttributes(checkItem,[["class","check-item"],["id",`x${id}-check-item`],["data-project",allCheckItems[id].project],["style","display:block"]]);

    //Top DIV (always visible)
    let checkItemTop = document.createElement("div");
    addAttributes(checkItemTop,[["class","check-item-top"],["id",`x${id}-check-item-top`]]);

    //--Expand DIV (visible on expand)
    let expandDiv = document.createElement("div");
    addAttributes(expandDiv,[["class","check-item-expand"],["style","display:none"],["id",`x${id}-expand-div`]]);
    

    const createTop = () => {
        //-TITLE
        let checkItemTitle = document.createElement("div");
        addAttributes(checkItemTitle,[["class","check-box-title-div"]]);
        //Check Box
        let checkBoxBtn = document.createElement("button");
        addAttributes(checkBoxBtn,[["class","check-box-btn"]]);
        let checkBoxSpan = document.createElement("span");
        addAttributes(checkBoxSpan,[["class","material-icons md-36 check-box"]]);
        checkBoxSpan.innerHTML="&#xE86C;";
        checkBoxBtn.appendChild(checkBoxSpan);
        //Title
        let checkTitle = document.createElement("h4");
        addAttributes(checkTitle,[["class","check-title"],["id",`x${id}-title`]]);
        checkTitle.textContent=allCheckItems[id].title;
        //Tags
        let checkTagDiv = document.createElement("div");
        addAttributes(checkTagDiv,[["class","check-tag-div"],["id",`x${id}-tag`]]);
        let myTags = allCheckItems[id].tags;
        myTags.forEach((tag) => {
            let newTag = document.createElement("span");
            addAttributes(newTag,[["class","check-tag"]]);
            newTag.textContent="#"+tag;
            checkTagDiv.appendChild(newTag);
        });
        //Append for Title
        appendChildren(checkItemTitle,[checkBoxBtn,checkTitle,checkTagDiv]);
        //-ICON
        let checkIcon = document.createElement("h4");
        addAttributes(checkIcon,[["class","check-icon"],["id",`x${id}-icon`]]);
        let iconSpan = document.createElement("span");
        iconSpan.innerHTML=allCheckItems[id].icon;
        checkIcon.appendChild(iconSpan);
        //Append for Top
        appendChildren(checkItemTop,[checkItemTitle,checkIcon]);
    }
    createTop();

    
    const createExpand = () => {
        //INFO
        let info = document.createElement("textarea");
        addAttributes(info,[["class","check-info"],["name","info"],["rows","8"],["cols","50"],["id",`x${id}-info`]]);
        info.textContent= allCheckItems[id].info;
        //-EXPAND BOTTOM
        let expandBottomDiv = document.createElement("div");
        addAttributes(expandBottomDiv,[["class","check-item-bottom"]]);
        //Due Date
        let dueElement = document.createElement("h5");
        dueElement.textContent="Due: ";
        let dueSpan = document.createElement("span");
        addAttributes(dueSpan,[["class","check-due"],["id",`x${id}-due`]]);
        dueSpan.textContent=allCheckItems[id].due;
        dueElement.appendChild(dueSpan);
        //Edit Buttons Div
        let editButtonDiv = document.createElement("div");
        addAttributes(editButtonDiv,[["class","check-item-bottom-right"]]);
        //Edit Buttons
        let btnIcon = makeEditButton(id,"icon","&#xE87C;");
        let btnPriority = makeEditButton(id,"priority","&#xE16D;");
        let btnDue = makeEditButton(id,"due","&#xE916;");
        let btnTag = makeEditButton(id,"tag","&#xE54E;");
        let btnPencil = makeEditButton(id,"pencil","&#xE3C9;");
        appendChildren(editButtonDiv,[btnIcon,btnPriority,btnDue,btnTag,btnPencil]);
        //Append
        appendChildren(expandBottomDiv,[dueElement,editButtonDiv]);
        appendChildren(expandDiv,[info,expandBottomDiv]);
    }
    createExpand();
    
    //TESTING
    checkItem.appendChild(checkItemTop);
    checkItem.appendChild(expandDiv);
    checklist.appendChild(checkItem);

    //So that I update the NodeLists that contain check items
    var evt = new CustomEvent('addedCheckItem');
    window.dispatchEvent(evt);
}


let allCheckItems = {
    "0": {
        title: "Pack Luggage",
        checked: false,
        icon: "&#x1F4BC;",
        tags: ["travel","plan"],
        info:"Notes...",
        due: "00/00/00",
        priority: "3",
        project: "trip",
    },
    "1": {
        title: "Read Travel Book",
        checked: false,
        icon: "&#x1F4D6;",
        tags: ["travel","plan"],
        info:"Notes...",
        due: "00/00/00",
        priority: "2",
        project: "trip",
    },
}

export {createCheckItem, editCheckObject};