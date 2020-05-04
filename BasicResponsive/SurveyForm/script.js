const emailRegex = /^[A-Za-z][\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;
const numberRegex = /^\d+$/;

var email, number;
var submit;
function addElements(){
    email = document.getElementById('email');
    number = document.getElementById('number');
    submit = document.getElementById('btnSubmit');
}
addElements();

function addEvents(){
    submit.addEventListener('click', ()=>{
        if(emailRegex.test(email.value) == false)
        {
            //print error
        }
        if(numberRegex.test(number.value) == false)
        {
            //print error
        }
    });
}

