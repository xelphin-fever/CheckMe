import { createCheckItem, editCheckObject } from "./createCheckItem"

const checkItem = (() => {
    //Testing
    createCheckItem("1");
    editCheckObject.addNewCheck("Print Map",false,"&#xE3C9;",["print","travel"],"Need to print map","20/02/2005","4");
    console.log(editCheckObject.returnCheckAt(3));
    createCheckItem("3");
    //
    //

    let checkItemsTop = document.querySelectorAll(".check-item-top");
    let icons = document.querySelectorAll(".check-icon");
    let previousExpanded=null;

    const updateVariables = () => {
        checkItems = document.querySelectorAll(".check-item");
        icons = document.querySelectorAll(".check-icon");
    }
    

    checkItemsTop.forEach((checkItem) =>{
        checkItem.addEventListener("click", changeItemSize);
    })

    
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
})();

export {checkItem};