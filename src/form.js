import datepicker from 'js-datepicker'
import { createCheckItem, editCheckObject } from "./createCheckItem"
import {project} from "./displayController"


const form = (() => {
    console.log("form:")
    const form = document.querySelector("#form-div")
    const addBtn = document.querySelector("#add-check-btn");
    const closeBtn = document.querySelector("#btn-close-form");
    const calenderBtn = document.querySelector("#form-due-btn");
    addBtn.addEventListener("click",showForm);
    closeBtn.addEventListener("click",closeForm);

    

    //Emoji Picker
    let currentEmoji = "&#x26AA;"
    document.querySelector('#form-icon-picker').addEventListener('emoji-click', event => {
        console.log(event.detail);
        console.log(event.detail["emoji"].unicode)
        currentEmoji = event.detail["emoji"].unicode;
    });

    //SHOW FORM
    function showForm (){
        currentEmoji = "&#x26AA;"
        console.log("show form");
        form.style.display="block";
    }
    //CLOSE FORM
    function closeForm(){
        form.style.display="none";
    }
    
    //FORM SUBMITTED -> Create Check Item
    form.addEventListener("submit", function(event) {
        event.preventDefault(); //stop from submition
        let title = document.forms["myForm"]["form-title"].value;
        let tags = document.forms["myForm"]["form-tags"].value.split(" ");
        let info = document.forms["myForm"]["form-info"].value;
        let due = document.forms["myForm"]["form-due-btn"].value;
        let priority = document.forms["myForm"]["form-priority"].value;
        let projectName = project.getCurrentProject();
        editCheckObject.addNewCheck(title,false,currentEmoji,tags,info,due,priority,projectName);
        form.style.display="none";
        //form.reset();
        createCheckItem(editCheckObject.mostRecentId().toString());
      })

})();

export {form};