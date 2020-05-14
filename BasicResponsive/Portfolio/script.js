$(document).ready(function(){

    $(".nav-link").click(function(){
        // console.log("clicked!")
        var link = $(this).data('link');
        // console.log(link);
        $("html, body").animate({
            scrollTop: $(link).offset().top -60
        }, 350);
    });

    $("#projects a").hover(
        function(){
        //hander hover in
        // $(".code").fadeIn(300);
            $(this).find(".code").fadeIn(300);
            $(this).find(".code").css("color","var(--main-red)")
        },
        function(){
            //hander hover out
            // $(".code").fadeOut(300);
            $(this).find(".code").fadeOut(300);
            // $(this).find(".code").css("color","var(--main-gray)");
        }
    );

    $(".project-tile").hover(
        function(){
            //hover on
            $(this).find("img").css("transform", "scale(1.2)");
        },
        function (){
            //hover out
            $(this).find("img").css("transform", "none");
        }
    );
});