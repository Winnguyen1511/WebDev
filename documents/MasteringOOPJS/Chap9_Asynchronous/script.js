console.log("First");
setTimeout(function(){
    console.log("Second");
}, 300);
console.log("Third");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        console.log("Get success!")
        // let para = document.getElementById("para");
        para = JSON.parse(xhttp.responseText);
        console.log(para);
        // para.innerHTML = this.responseText;
    }
}
console.log("Start!")
xhttp.open("GET","userdata.json", true);
xhttp.send();
console.log("finished")
