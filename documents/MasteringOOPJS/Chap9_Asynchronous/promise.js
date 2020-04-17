function httpGet(url)
{
    var promise = new Promise((resolve, reject) =>{
        let httpReq = new XMLHttpRequest();

        httpReq.onreadystatechange = function()
        {
            let data;
            if(httpReq.readyState == 4){
                if(httpReq.status == 200)
                {
                    data = httpReq.responseText;
                    // console.log(data);
                    resolve(data);
                }
                else{
                    data = httpReq.statusText;
                    reject(data);
                }
            }
        };

        httpReq.open("GET", url, true);
        httpReq.send();
    });

    return promise;
}

function displayUser(user)
{
    // console.log("di")
    let paraUser = document.getElementById("user");
    paraUser.innerHTML = user;
    console.log(user);
}

function displayPara(content)
{
    let para = document.getElementById("para");
    para.innerHTML = content;
    console.log(content);
}
function displayError(error)
{
    console.log("Error:"+error);
}

function getUser(user)
{
    return httpGet(user);
}
function getPara(para)
{
    return httpGet(para);
}

// getUser("user.txt").then(displayUser);
                    //  .catch(displayError);
var tmp = getUser("user.txt").then(displayUser)
                                .catch(displayError);
// setTimeout(console.log(tmp), 100);