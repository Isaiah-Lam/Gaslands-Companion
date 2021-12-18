$(document).ready( () => {
    $(".option").click(function() {
        $(this).parent().children().each(function() {
            $(this).removeClass("selected");
        });
        $(this).addClass("selected");
        $(document).scrollTop($(this).parent().parent().next().offset().top);
    });
})