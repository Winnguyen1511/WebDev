$(document).ready(function(){
    $('#menu').click(function(){
        // console.log("Clicked!")
        // $("#navbar").toggle(100);
        // $("#navbar").fadeOut(100);
        // $("#navbar").fadeToggle(100, function(){
        //     alert("Faded!");
        // });
        $("#navbar").slideToggle("slow", function()
        {
            alert("slideToggle!");
            console.log("slideToggle!");
        });
    });
});