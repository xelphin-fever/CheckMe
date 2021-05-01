
import { appendChildren, addAttributes,addTagsToDiv, makeToolTip } from "./utilities"


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
        addTagsToDiv(checkTagDiv,myTags);
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
        //Priority
        let priorityElement = document.createElement("h5");
        priorityElement.textContent="Priority: ";
        let prioritySpan = document.createElement("span");
        addAttributes(prioritySpan,[["class","check-priority"],["id",`x${id}-priority`]]);
        prioritySpan.textContent=allCheckItems[id].priority;
        priorityElement.appendChild(prioritySpan);
        //Edit Buttons Div
        let editButtonDiv = document.createElement("div");
        addAttributes(editButtonDiv,[["class","check-item-bottom-right"]]);
        //Edit Buttons
        let btnIcon = makeToolTip(id,"icon","&#xE87C;","Choose Icon");
        let btnPriority = makeToolTip(id,"priority","&#xE16D;","Choose Priority");
        let btnDue = makeToolTip(id,"due","&#xE916;","Choose Due Date");
        let btnTag = makeToolTip(id,"tag","&#xE54E;","Enter Tags");
        let btnTitle = makeToolTip(id,"title","&#xE264;","Enter Title");
        appendChildren(editButtonDiv,[btnIcon,btnPriority,btnDue,btnTag,btnTitle]);
        //Append
        appendChildren(expandBottomDiv,[dueElement,priorityElement,editButtonDiv]);
        appendChildren(expandDiv,[info,expandBottomDiv]);
    }
    createExpand();
    
    //Appending Final
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
        due: "00-00-00",
        priority: "3",
        project: "trip",
    },
    "1": {
        title: "Read Travel Book",
        checked: false,
        icon: "&#x1F4D6;",
        tags: ["travel","plan"],
        info:"Notes...",
        due: "00-00-00",
        priority: "2",
        project: "trip",
    },
}

export {createCheckItem, editCheckObject};