import * as Valid from './valid-info.js'

var txtEmail, txtPass;
var btnLogIn;
var popupEmail, popupPass;

// const username = "khoanguyen1507dn@gmail.com"
// const password = "khoanguyen1511dn.."
function addElements()
{
    txtEmail = document.getElementById("txtEmail");
    txtPass = document.getElementById("txtPass");
    btnLogIn = document.getElementById("btnLogIn");
    popupEmail = document.getElementById("popupEmailError");
    popupPass = document.getElementById("popupPassError");
}

function addEvents()
{
    btnLogIn.addEventListener("click", btnLogIn_OnClick);
    txtEmail.addEventListener("focus",() =>{
        txtEmail.classList.remove("text-error");
        popupEmail.classList.remove("show");
    });
    txtPass.addEventListener("focus", ()=>{
        txtPass.classList.remove("text-error");
        popupPass.classList.remove("show");
    })
}

function btnLogIn_OnClick()
{
    console.log("Log in");
    let email = txtEmail.value;
    let pass = txtPass.value;
    if(Valid.validEmail_Full(email) == false)
    {
        popupEmail.innerHTML = "Please enter a valid email address.";
        txtEmail.classList.add("text-error");
        popupEmail.classList.add("show");
        return;
    }
    if(Valid.validPass(pass) == false)
    {
        popupPass.innerHTML = "Please enter a valid password.";
        txtPass.classList.add("text-error");
        popupPass.classList.add("show");
        return;
    }
    
    checkAccount(email, pass).then(checkDatabase);
}
function checkAccount(email, pass)
{
    // console.log("from checkAccount:"+email);
    // console.log("from checkAccount:"+pass);
    var promise = new Promise((resolve, reject) => {
        var httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function()
        {
            var database;
            if(httpReq.readyState == 4)
            {
                if(httpReq.status == 200)
                {
                    database = JSON.parse(httpReq.responseText);
                    // console.log(database);
                    //Note that the resolve and reject only take 1 argument
                    resolve({email, pass, database});
                }
                else{
                    reject(new Error(httpReq.statusText));
                }
            }
        };

        httpReq.open("GET", "../username.json");
        httpReq.send();
    });
    return promise;
    
}

function checkDatabase(data)
{   
    let email = data.email;
    let pass = data.pass;
    let database = data.database;
    if(!database[email])
    {
        wrongEmail();
        return;
    }
    if(database[email].password != pass)
    {
        wrongPass();
        return;
    }
    
    window.alert(database[email].name+"\nLogin successful!");
        
}

function wrongEmail()
{
    txtEmail.classList.add("text-error");
    popupEmail.innerHTML = "We cannot find you email. Try again!";
    popupEmail.classList.add("show");
}

function wrongPass()
{
    txtPass.classList.add("text-error");
    popupPass.innerHTML = "Wrong password. Try again!";
    popupPass.classList.add("show");  
}
function main()
{
    addElements();
    addEvents();
}

main();
