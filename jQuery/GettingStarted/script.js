$(document).ready(
    function(){
        $("#p1").hover(function(){
            $(this).hide();
        });
    
        $("#p2").click(function(){
            $(this).hide();
        });
        $('#p3').dblclick(function(){
            $(this).hide();
        });
        $("#p4").mouseout(function(){
            $(this).hide();
        });

        var menuTrigger = false;
        $(document).keypress(function(e){
            if(e.which == 13)
            {
                if(menuTrigger === false)
                {
                    $('nav').fadeIn(500);
                    menuTrigger = true;
                }
                else
                {
                    $('nav').fadeOut(500);
                    menuTrigger = false;
                }
            }
        });
    }
);
