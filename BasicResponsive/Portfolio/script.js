$(document).ready(function(){
    $('#about img, #software-web-dev, #teaching-assistance').hide('fast');
    $('.content h1').hide('fast');
    $('.project-tile a').hide('fast');
    $('.underline').hide('fast');
    $('#r1').trigger('click');
    $("label[for='r1']").removeClass('label-unchecked').addClass('label-checked');
    var slideCount = 0;
    const number_of_slides = 3;
    window.setInterval(function () {
        $("input[id='r"+(slideCount+1).toString()+"']").trigger('click');
        slideCount = (slideCount+1)%number_of_slides;
    }, 5000);
    var windowHeight = $(window).height();
    var aboutLoaded = false;
    var projectsLoaded = false;
    var aboutContentLoaded = false;
    var projectsContentLoaded = false;
    console.log(windowHeight)
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
    $(window).scroll(function(){
        // console.log("Out");
        if($(window).scrollTop() != 0)
        {
            // console.log("Here");
            
            $("#navbar").css("background-color", "var(--main-black)");

        }
        else{
            $("#navbar").css("background-color", "transparent");

        }
        if(aboutLoaded == false)
        {
            // console.log($(window).scrollTop())
            if(aboutContentLoaded == false)
            {
                if($(window).scrollTop() > 20)
                {
                    // alert('about')
                    console.log("About...");
                    aboutContentLoaded = true;
                    $('#about h1').show('drop',{direction: 'right'}, 800);
                    $('#about .underline').show('drop', {direction: 'left'}, 800);
                    // $('#about img').slideUp(1000)
                }
            }
            
            if($(window).scrollTop() > 200)
            {
                aboutLoaded = true;
                $('#about img, #software-web-dev, #teaching-assistance').show('drop',{direction: 'down'}, 800)
            }
        }  
        if(projectsLoaded == false)
        {
            // console.log($('#projects').scrollTop())
            // console.log($(window).scrollTop())

            // console.log($(window).height())

            if(projectsContentLoaded == false)
            {
                if($(window).scrollTop() - windowHeight > 20)
                {
                    // alert('projects...')
                    console.log("projects...")
                    // projectsLoaded = true
                    $('#projects h1').show('drop',{direction: 'right'},800);
                    $('#projects .underline').show('drop', {direction: 'left'}, 800);
                    // $('.project-tile').show('drop',{direction: 'down'},800);
                }
            }
            if($(window).scrollTop() - windowHeight > 200)
            {
                // alert('projects...')
                console.log("projects...")
                projectsLoaded = true
                // $('.project-tile').show('drop',{direction: 'down'},800);
                var count = 0;
                projects = $('.project-tile a').each(function(){
                    $(this).show('drop', {direction: 'down'}, count*200 +500);
                    count++;
                });
            }
        }
        // aboutLoaded = 1;
        // console.log('About load=', aboutLoaded)
    });
    $('input[type=radio]').click(function(){
        // console.log($(this).attr('name'));
        // console.log($(this).attr('id'));
        // console.log($(this).attr('checked'));
        $("label").addClass('label-unchecked');
        if($(this).prop('checked') == true)
        {
            console.log("true");
            $("label[for='"+$(this).attr('id')+"']").removeClass('label-unchecked').addClass('label-checked');
            var num = parseInt($(this).data('slide'));
            // console.log($('.slides:nth-child(1)'))
            $('.s1').css('margin-left', (-(num-1) *33.33).toString()+'%')
        }
        
    });

});