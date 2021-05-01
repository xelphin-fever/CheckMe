

//APPEND CHILDREN
function appendChildren (parent,children){
    //children == array == [child,child,child]
    children.forEach((child) => {
        parent.appendChild(child);
    })
}

//ADD ATTRIBUTES
function addAttributes (element, attributes){
    //attributes == array == [["id","myID"],["class","myClass otherClass"],["data-foo","hello"]]
    for (let i=0; i<attributes.length;i++){
        element.setAttribute(attributes[i][0], attributes[i][1]); 
    }
}

//MAKE TAGS
function addTagsToDiv (divTags,tags){
    tags.forEach((tag) => {
        let newTag = document.createElement("span");
        addAttributes(newTag,[["class","check-tag"]]);
        newTag.textContent="#"+tag;
        divTags.appendChild(newTag);
    });
}

//MAKE EDIT BUTTON
function makeEditButton (id,type,spanIcon){
    let btnEdit = document.createElement("button");
    addAttributes(btnEdit,[["class","check-edit-btn"],["id",`x${id}-btn-${type}`]]);
    let spanEdit = document.createElement("span");
    addAttributes(spanEdit,[["class","material-icons md-36"]]);
    spanEdit.innerHTML=spanIcon;
    btnEdit.appendChild(spanEdit);
    return btnEdit;
}

//MAKE CHECK TOOLTIP
function makeToolTip (id,type,spanIcon,heading){
    let divToolTip = document.createElement("div");
    addAttributes(divToolTip,[["class","tooltip"]]);
    //HOVER BUTTON
    let myHoverButton = makeEditButton(id,type,spanIcon);
    //SPAN
    let spanToolTip = document.createElement("span");
    addAttributes(spanToolTip,[["class","tooltiptext-v2"]]);
    let innerDivToolTip = document.createElement("div");
    addAttributes(innerDivToolTip,[["class","tooltip-inner-div"]]);
    //Span Heading
    let headingToolTip = document.createElement("h4");
    headingToolTip.textContent=heading;
    let sendSpan = document.createElement("span");
    addAttributes(sendSpan,[["class",`material-icons md-36 check-btn-${type}-send`],["id",`x${id}-check-${type}-send`]]);
    sendSpan.innerHTML= "&#xF1DF;";
    headingToolTip.appendChild(sendSpan);
    //Input
    let myInput = makeInputCheck(id,type);
    //Append
    appendChildren(innerDivToolTip,[headingToolTip,myInput]);
    appendChildren(spanToolTip,[innerDivToolTip]);
    appendChildren(divToolTip,[myHoverButton,spanToolTip]);
    return divToolTip;

}

function makeInputCheck(id,type){
    //NOTE: MAKE THIS CLEANER AND MORE EFFICIENT
    let divInput = document.createElement("div");
    let myInput = document.createElement("input");
    if (type=="title" || type=="tag"){
        addAttributes(myInput,[["type","text"],["id",`x${id}-check-${type}-input`],["class","edit-input"],["maxlength","20"],["placeholder",""]]);
        divInput.appendChild(myInput);
    }
    //Change Later
    else if (type=="due"){
        addAttributes(myInput,[["type","date"],["id",`x${id}-check-${type}-input`],["class","edit-input"],["placeholder",""]]);
        divInput.appendChild(myInput);
    }
    else if (type=="priority"){
        divInput.classList.add("check-edit-div-priority");
        let pLow = document.createElement("p");
        pLow.textContent="Low";
        divInput.appendChild(pLow);
        for (let i=1;i<6;i++){
            let radioBtn = document.createElement("input");
            addAttributes(radioBtn,[["type","radio"],["id",`x${id}-check-${type}-input-${i}`],["name",`x${id}-check-${type}-input`],["value",`${i}`]]);
            if (i==1){
                radioBtn.setAttribute("checked","checked");
            }
            divInput.appendChild(radioBtn);
        }
        let pHigh = document.createElement("p");
        pHigh.textContent="High";
        divInput.appendChild(pHigh);
    }
    else if (type=="icon"){
        let iconPicker = document.createElement("emoji-picker");
        addAttributes(iconPicker,[["id",`x${id}-check-${type}-input`],["class","select-emoji-picker"]]);
        divInput.appendChild(iconPicker);
    }
    return divInput;
}


export {appendChildren, addAttributes, addTagsToDiv, makeEditButton, makeToolTip};