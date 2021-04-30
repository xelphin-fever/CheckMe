import { createCheckItem, editCheckObject } from "./createCheckItem"

const checkItem = (() => {
    //Testing
    createCheckItem("1");
    editCheckObject.addNewCheck("Print Map",false,"&#xE3C9;",["print","travel"],"Need to print map","20/02/2005","4");
    console.log(editCheckObject.returnCheckAt(3));
    createCheckItem("3");
    createCheckItem("2");
    //
    //

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

    

})();

export {checkItem};