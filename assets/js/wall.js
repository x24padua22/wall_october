$(document).ready( () => {
    $("#create_post").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
            }
            else{
                alert(data.error);
            }
        }, "json");

        return false;
    });

    $(".create_comment").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
            }
            else{
                alert(data.error);
            }
        }, "json");

        return false;
    });

    $(".delete_post").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
            }
            else{
                alert(data.error);
            }
           
        }, "json");

        return false;
    });

    $(".delete_comment").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
            }
            else{
                alert(data.error);
            }
        }, "json");

        return false;
    });
});