import datepicker from 'js-datepicker'
import { createCheckItem, editCheckObject } from "./createCheckItem"


const form = (() => {
    console.log("form:")
    const form = document.querySelector("#form-div")
    const addBtn = document.querySelector("#add-check-btn");
    const closeBtn = document.querySelector("#btn-close-form");
    const calenderBtn = document.querySelector("#form-due-btn");
    addBtn.addEventListener("click",showForm);
    closeBtn.addEventListener("click",closeForm);
    const picker = datepicker(calenderBtn);
    let currentEmoji = "&#x26AA;"
    document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
        console.log(event.detail);
        console.log(event.detail["emoji"].unicode)
        currentEmoji = event.detail["emoji"].unicode;
    });

    function showForm (){
        currentEmoji = "&#x26AA;"
        console.log("show form");
        form.style.display="block";
    }
    function closeForm(){
        form.style.display="none";
    }
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); //stop from submition
        let title = document.forms["myForm"]["form-title"].value;
        let tags = document.forms["myForm"]["form-tags"].value.split(" ");
        let info = document.forms["myForm"]["form-info"].value;
        let due = document.forms["myForm"]["form-due-btn"].value;
        let priority = document.forms["myForm"]["form-priority"].value;
        editCheckObject.addNewCheck(title,false,currentEmoji,tags,info,due,priority);
        form.style.display="none";
        //form.reset();
        createCheckItem(editCheckObject.mostRecentId().toString());
      })

})();

export {form};