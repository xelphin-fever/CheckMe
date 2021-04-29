

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

//MAKE EDIT BUTTON
function makeEditButton (id,type,spanIcon){
    let btnEdit = document.createElement("button");
    addAttributes(btnEdit,[["class","check-edit-btn"],["id",`${id}-btn-${type}`]]);
    let spanEdit = document.createElement("span");
    addAttributes(spanEdit,[["class","material-icons md-36 check-box"]]);
    spanEdit.innerHTML=spanIcon;
    btnEdit.appendChild(spanEdit);
    return btnEdit;
}


export {appendChildren, addAttributes, makeEditButton};