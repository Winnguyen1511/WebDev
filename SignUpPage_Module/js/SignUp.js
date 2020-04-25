import * as Valid from './valid-info.js'

const mthArr = ["January", "February", "March", "April", "May",
                        "June", "July", "August", "September", "October",
                        "November", "December"];
const genderList = [...document.getElementsByName("ckbGender")];

//Dynamic text for popup:
const popuptxt = {
    "name":{"normal":"What's your name?"},
    "email":{"normal":"You'll use this when you log in.",
            "error":"Please enter a valid email address."},
    "pass":{"normal":"Enter a combination of at least six numbers and characters.",
            "error":"Please enter a valid password."},
    "retype":{"normal":"Retype your password here.",
            "error":"Password retype mismatch."}
}

// console.log(genderList[0].checked);
let gender = genderList.reduce((prev, cur) =>{
    return prev.checked == true ? prev : cur;
});
gender = gender.value;
function radioButtonHandler(value)
{
    gender = value;
}
let date = new Date();
var txtFirstName, txtFamilyName;
var txtEmail, txtPass, txtRetypePass;

var popupFamilyName, popupEmail, popupPass, popupRetype;

var sltDate, sltMonth, sltYear;
var btnSignUp;

var radioFemale, radioMale, radioOther; 

function addElements()
{
    //Add textbox:
    txtFirstName = document.getElementById("txtFirstName");
    // console.log(txtFirstName);
    txtFamilyName = document.getElementById("txtFamilyName");
    txtEmail = document.getElementById("txtEmail");
    txtPass = document.getElementById("txtPass");
    txtRetypePass = document.getElementById("txtRetypePass");
    
    //Add popups:
    popupFamilyName = document.getElementById("popupFamilyName");
    popupEmail = document.getElementById("popupEmail");
    popupPass = document.getElementById("popupPass")
    popupRetype = document.getElementById("popupRetype")    
    
    //Add slt and add option:
    sltDate = document.getElementById("sltDate");
    let optDefault = document.createElement("option");
    optDefault.value = "Day";
    optDefault.innerHTML = "Day";
    sltDate.appendChild(optDefault)
    for(let i = 1; i <= 31; i ++)
    {
        let opt = document.createElement("option");
        opt.value = i+"";
        opt.innerHTML = i+"";
        sltDate.appendChild(opt);
    }

    sltMonth = document.getElementById("sltMonth");
    optDefault = document.createElement("option");
    optDefault.value = "Month";
    optDefault.innerHTML ="Month";
    sltMonth.appendChild(optDefault);
    for(let i = 1; i <= 12; i++)
    {
        let opt = document.createElement("option");
        opt.value = i+"";
        opt.innerHTML = mthArr[i - 1];
        sltMonth.appendChild(opt);
    }
    sltYear = document.getElementById("sltYear");
    optDefault = document.createElement("option");
    optDefault.value = "Year";
    optDefault.innerHTML ="Year";
    sltYear.appendChild(optDefault)
    for(let i = date.getFullYear(); i >= date.getFullYear() - 115; i--)
    {
        let opt = document.createElement("option");
        opt.value = i+"";
        opt.innerHTML = i+"";
        sltYear.appendChild(opt);
    }

    //Add radio button:
    radioFemale = document.getElementById("radioFemale");
    radioMale = document.getElementById("radioMale");
    radioOther = document.getElementById("radioOther");

    //Add button:
    btnSignUp = document.getElementById("btnSignUp");
}

function addEvents()
{
    //Add Events on Focus for textboxes:
    txtFirstName.addEventListener("focus", ()=>{
        //Popup for Firstname
        // console.log("Focus first name");
        // const popup = document.getElementById("popupFirstName");
        popupFamilyName.innerHTML = popuptxt['name']['normal'];
        popupFamilyName.classList.add("show");
    });
    txtFirstName.addEventListener("focusout", ()=>{
        // console.log("Out first name");
        // const popup = document.getElementById("popupFirstName");
        popupFamilyName.classList.remove("show");
    });

    txtFamilyName.addEventListener("focus", ()=>{
        //Popup for Family name
        // console.log("Focus family name");
        // const popup = document.getElementById("popupFamilyName");
        popupFamilyName.innerHTML = popuptxt['name']['normal'];
        popupFamilyName.classList.add("show");
    });
    txtFamilyName.addEventListener("focusout", ()=>{
        // console.log("Out Family name");
        // const popup = document.getElementById("popupFamilyName");
        popupFamilyName.classList.remove("show");
    });

    txtEmail.addEventListener("focus", ()=>{
        // console.log("Focus email");
        // const popup = document.getElementById("popupEmail");
        popupEmail.innerHTML = popuptxt['email']['normal'];
        popupEmail.classList.add("show");
        txtEmail.classList.remove("text-error");
        popupEmail.classList.remove("popup-error")
        // const popupError = document.getElementById("popupEmailError");
        // popupError.classList.remove("show");
    });
    txtEmail.addEventListener("focusout", ()=>{
        // console.log("Out Email");
        // const popup = document.getElementById("popupEmail");
        popupEmail.classList.remove("show");
    });

    txtPass.addEventListener("focus", ()=>{
        //Popup for password
        // console.log("Focus password");
        // const popup = document.getElementById("popupPass");
        popupPass.innerHTML = popuptxt['pass']['normal'];
        popupPass.classList.add("show");
        txtPass.classList.remove("text-error");
        popupPass.classList.remove("popup-error")
        // const popupError = document.getElementById("popupPassError");
        // popupError.classList.remove("show");

    });
    
    txtPass.addEventListener("focusout", ()=>{
        // console.log("Out password");
        // const popup = document.getElementById("popupPass");
        popupPass.classList.remove("show");
    });

    txtRetypePass.addEventListener("focus", ()=>{
        //Popup for retype password
        // console.log("Focus retype password");
        // const popup = document.getElementById("popupRetype");
        popupRetype.innerHTML = popuptxt['retype']['normal'];
        popupRetype.classList.add("show");
        txtRetypePass.classList.remove("text-error");
        popupRetype.classList.remove("popup-error");
        // const popupError = document.getElementById("popupRetypeError");
        // popupError.classList.remove("show");
    });
    txtRetypePass.addEventListener("focusout", ()=>{
        // console.log("Out Retype pass");
        // const popup = document.getElementById("popupRetype");
        popupRetype.classList.remove("show");
    });
    //add onchange event for radio buttons:
    radioFemale.addEventListener("change", ()=>{
        return radioButtonHandler(radioFemale.value);
    } )

    radioMale.addEventListener("change", ()=>{
        return radioButtonHandler(radioMale.value);
    })

    radioOther.addEventListener("change", ()=>{
        return radioButtonHandler(radioOther.value);
    })
    
    //Add Events when Sign In:
    btnSignUp.addEventListener("click", ()=>{
        console.log("Sign in...");
        const infoStat = InforHandler();
        const dateStat = DateHandler();
        if(infoStat == true && dateStat == true)
        {
            addAccount().then(updateDatabase);    
        }
            
        // txtEmail.classList.toggle("text-error");
    });
}
function addAccount() {
    var promise = new Promise((resolve, reject) => {
        let httpReq = new XMLHttpRequest();

        httpReq.onreadystatechange = function()
        {
            var database; 
            if(httpReq.readyState == 4)
            {
                if(httpReq.status == 200)
                {
                    database = JSON.parse(httpReq.responseText);
                    resolve(database);
                }
                else{
                    reject(new Error(httpReq.statusText));
                }
            }
        };

        httpReq.open('GET','../username.json',true);
        httpReq.send();
    });
    return promise;
}

function updateDatabase(database)
{
    let email = txtEmail.value;
    let pass = txtPass.value;
    let name = txtFirstName.value + " "+txtFamilyName;

    if(!database[email])
    {
        database[email] = {"name": name, "password": pass};
    }
    else{
        window.alert("Account already exists!");
        return
    }
    console.log("Updating database");
    //This involve nodeJS
    // var fs = require("fs");
    const jsonString = JSON.stringify(database, null,2);
    // fs.writeFile('../username.json',jsonString, err =>{
    //     if(err)
    //     {
    //         console.log("Error writing database", err);
    //     }
    //     else{
    //         console.log("Successfully write database");
    //     }
    // })

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([jsonString]), {type:"text/plain"});
    a.setAttribute("download", "username.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.alert("Sign up successed!!!");
}


function InforHandler()
{
    let stat = true;
    let emailCheck = Valid.validEmail_Full(txtEmail.value);
    if(emailCheck == false)
    {
        txtEmail.classList.add("text-error");
        // const popupError = document.getElementById("popupEmailError");
        popupEmail.innerHTML = popuptxt['email']['error'];
        popupEmail.classList.add("popup-error")
        popupEmail.classList.add("show");
        stat = false;
    }
    let passCheck = Valid.validPass(txtPass.value);
    if(passCheck == false)
    {
        txtPass.classList.add("text-error");
        // const popupError = document.getElementById("popupPassError");
        popupPass.innerHTML = popuptxt['pass']['error'];
        popupPass.classList.add("popup-error");
        popupPass.classList.add("show");
        stat = false;
    }
    if(txtPass.value != txtRetypePass.value)
    {
        txtRetypePass.classList.add("text-error");
        // const popupError = document.getElementById("popupRetypeError");
        popupRetype.innerHTML = popuptxt['retype']['error'];
        popupRetype.classList.add("popup-error");
        popupRetype.classList.add("show");
        stat = false;
    }
    return stat;
}
function DateHandler()
{
    let d=undefined, m=undefined, y=undefined, g;
    console.log(sltDate.value)
    console.log(sltMonth.value)
    console.log(sltYear.value)
    if(sltDate.value != "Day" && sltMonth != "Month" && sltYear != "Year")
    {
        d = parseInt(sltDate.value);
        m = parseInt(sltMonth.value);
        y = parseInt(sltYear.value);
    }
    g = gender;
    let dateStat = false;
    // console.log(d+m+y)
    if(d != undefined && m != undefined & y != undefined)
    {
        dateStat = true;
    }
    else{
        dateStat = false;
    }
    return dateStat;
}
function main()
{
    addElements();
    addEvents();
}

main();

