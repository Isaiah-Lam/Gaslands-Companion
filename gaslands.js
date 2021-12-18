$(document).ready( () => {
    $(".option").click(function() {
        $(this).parent().children().each(function() {
            $(this).removeClass("selected");
        });
        $(this).addClass("selected")
    })
})