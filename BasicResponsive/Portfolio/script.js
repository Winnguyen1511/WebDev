$(document).ready(function(){
    $('#about img, #software-web-dev, #teaching-assistance').hide('fast');
    $('.content h1').hide('fast');
    $('.project-tile a').hide('fast');
    $('.underline').hide('fast');
    $('#r1').trigger('click');
    $("label[for='r1']").removeClass('label-unchecked').addClass('label-checked');
    $('#skills .skills-box div').hide('fast');
    $('#rewards h2, #rewards div').hide('fast');
    $('#language h2, #language .progress').hide('fast');

    var slideCount = 0;
    const number_of_slides = 3;
    var windowHeight = $(window).height();
    var aboutLoaded = false;
    var projectsLoaded = false;
    var aboutContentLoaded = false;
    var projectsContentLoaded = false;
    var skillsLoaded = false;
    var skillsContentLoaded = false;
    console.log(windowHeight)
    $(".nav-links").click(function(){
        // console.log("clicked!")
        var link = $(this).data('link');
        // console.log(link);
        $("html, body").animate({
            scrollTop: $(link).offset().top -60 
        }, 350);
    });

    // $('.carousel').carousel({
    //     interval: 4000
    //     // keyboard: true
        
    // });
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
                    $('#about h1').show('drop',{direction: 'right'}, 1000);
                    $('#about .underline').show('drop', {direction: 'left'}, 1000);
                    // $('#about img').slideUp(1000)
                }
            }
            
            if($(window).scrollTop() > 400)
            {
                aboutLoaded = true;
                $('#about img, #software-web-dev, #teaching-assistance').show('drop',{direction: 'down'}, 800)
            }
        }  

        if(skillsLoaded == false)
        {
            if(skillsContentLoaded ==false)
            {
                if($(window).scrollTop() - windowHeight > 40)
                {
                    $('#skills h1').show('drop',{direction: 'right'},800);
                    $('#skills .underline').show('drop', {direction: 'left'}, 800);
                    skillsContentLoaded = true;
                }
            }
            if($(window).scrollTop() - windowHeight > 400)
            {
                skillsLoaded = true;
                $('#skills .skills-box div').show('scale', 1000);
                $('#rewards h2, #rewards div, #language h2').show('drop', {direction: 'down'}, 800);
                $('#language .progress').show('drop', {direction:'right'}, 800);
            }
            
        }
        if(projectsLoaded == false)
        {
            // console.log($('#projects').scrollTop())
            // console.log($(window).scrollTop())

            // console.log($(window).height())

            if(projectsContentLoaded == false)
            {
                if($(window).scrollTop() - 2*windowHeight > 40)
                {
                    // alert('projects...')
                    console.log("projects...")
                    // projectsLoaded = true
                    projectsContentLoaded = true;
                    $('#projects h1').show('drop',{direction: 'right'},800);
                    $('#projects .underline').show('drop', {direction: 'left'}, 800);
                    // $('.project-tile').show('drop',{direction: 'down'},800);
                }
            }
            if($(window).scrollTop() - 2*windowHeight > 400)
            {
                // alert('projects...')
                console.log("projects...")
                projectsLoaded = true
                // $('.project-tile').show('drop',{direction: 'down'},800);
                var count = 0;
                $('.project-tile a').each(function(){
                    $(this).show('drop', {direction: 'down'}, count*200 +500);
                    count++;
                });
            }
        }
        // aboutLoaded = 1;
        // console.log('About load=', aboutLoaded)
    });

});