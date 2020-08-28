$(document).ready(function(){

    new WOW().init();
    
    //nojs
    $("body").removeClass("no-js");
    
    //------------------------------------------------------------------------//
    
    //fakelink
    $('a[href="#"]').on('click',function(e){e.preventDefault();});
    
    //------------------------------------------------------------------------//
    
    //placeholder
    $('input[placeholder], textarea[placeholder]').placeholder();
    
    //------------------------------------------------------------------------//
    
    //tab
    $('.tabs').delegate('li:not(.active)','click',function(){$(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250);});


    // $('.js-wp-1').waypoint(function(direction){
    //     $('.js-wp-1').addClass('animated slideInUp');
    // }, {
    //     offset: '70%'
    // });
    
    $('.js-wp-2').waypoint(function(direction){
        setTimeout(function(){ $('.js-wp-2').addClass('animated fadeIn');
    }, 4000);
    }, {
        offset: '70%'
    });

    
    $(".Phone-button").delay(2700).animate({top: "+=3px"}, 300);
    $(".Phone-button").delay(300).animate({top: "95px"}, 100);
    
});//document ready