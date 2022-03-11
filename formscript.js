function check_non_empty(item) {
    if (item.value == "") {
        alert("The " + item.name + " was left empty.");
        return false;
    }
    return true;
}

function check_valid_email(item) {
    periodCount = item.value.split(".").length - 1;
    atCount = item.value.split("@").length - 1;
    var atSymbol = item.value.indexOf("@");
    if(atSymbol < 0) {
        alert("The " + item.name + " is not a valid email address.");
        return false;
    }
    var dot = item.value.indexOf(".");
    if(dot <= atSymbol) {
        alert("The " + item.name + " is not a valid email address.");
        return false;
    }
    if(periodCount !== 1 || atCount !== 1){
        alert("The " + item.name + " is not a valid email address.");
        return false;
    }
    return true;
}

function check_valid_zip(item) {
    if( item.value.length > 5){
        item.value = item.value.substring(0,5);
    }
    return true;
}

function hilite(item)
{
    savecolor = item.style.backgroundColor;
    item.style.backgroundColor = "#9ff";
}

function normal(item)
{
    item.style.backgroundColor = savecolor;
}
function check_form(){
    var item = document.getElementById("firstname");
    if(check_non_empty(item) == false){
        item.focus();
        return false;
    }

    item = document.getElementById("lastname");
    if(check_non_empty(item) == false){
        item.focus();
        return false;
    }

    item = document.getElementById("email");
    if(check_non_empty(item) == false){
        item.focus();
        return false;
    }
    if(check_valid_email(item) == false){
        item.focus();
        return false;
    }

    item = document.getElementById("address1");
    if(check_non_empty(item) == false){
        item.focus();
        return false;
    }

    item = document.getElementById("city");
    if(check_non_empty(item) == false){
        item.focus();
        return false;
    }

    item = document.getElementById("state");
    if(check_non_empty(item) == false){
        item.focus();
        return false;
    }

    item = document.getElementById("zip");
    if(check_non_empty(item) == false){
        item.focus();
        return false;
    }
    if(check_valid_zip(item) == false){
        item.focus();
        return false;
    }
}

"use strict";

function show_state(text)
{
    var textblock = document.getElementById("state");
    textblock.value =  text.split('\n')[1];

}
function show_city(text)
{
    var textblock = document.getElementById("city");
    textblock.value =  text.split('\n')[0]
}
function keyup(event)
{
    textbox = document.getElementById("zip");
    get_state_city(textbox.value);
}

function get_state_city(zip)
{
    if( zip > 5){
        zip = zip.substring(0,5);
    }

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "zip2statecity.cgi?" + zip, true);

    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                show_state(xhr.responseText);
                show_city(xhr.responseText);
            } else {
                show_state("Cannot find state given zip.");
            }
        }
    };
    // Activate the connection. 
    xhr.send(null);
}
