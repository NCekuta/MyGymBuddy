// Filter efekt
$(document).ready(function(){
    $('.filter-card').click(function(){
     const value = $(this).attr('data-filter');
     if(value == 'all'){
        $('.post-box').show('1000');
     }
     else{
        $('.post-box').not('.'+ value).hide('1000');
        $('.post-box').filter('.'+ value).show('1000');
     }
    })
})

// Dodajmo aktivni okvirček k gumbu
$(".filter-card").click(function () {
 $(this).addClass("active-filter").siblings().removeClass("active-filter");
});

