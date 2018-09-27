$(function () {
    $("#delete").on("click",function(event){
        event.preventDefault();
        var id = $("#submit").data("id");
        $.ajax({
            url: "/delete/"+ id,
            method: "Delete"
        }).then(function (data){
            displayComment(id);
        });
    });
    $("#scrape").on("click",function(event){
        event.preventDefault();
        $.ajax({
            url: "/scrape",
            method: "GET"
        }).then(function (data){
            location.reload();
        });

    })
    $(".titles").on("click", function (event) {
        $("#articleComments").modal("toggle")
        var id = $(this).data("id")
        $("#submit").attr("data-id", id);
        displayComment(id);

    })
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var id = $("#submit").data("id");
        var title = $("#newTitle").val();
        var body = $("#newComment").val();
        $("#newTitle").val("");
        $("#newComment").val("");
        var note = {
            title: title,
            body: body
        }
        $.ajax({
            url: "/articles/" + id,
            method: "GET"
        }).then(function (data) {

            if (data.note) {
                console.log("it wants to update")
                $.ajax({
                    url: "/note/" + data.note._id,
                    method: "PUT",
                    data: note
                }).then(function (data) {
                    displayComment(id);
                })
            }
            else {
                $.ajax({
                    url: "/articles/" + id,
                    method: "POST",
                    data: note
                }).then(function (data) {
                    displayComment(id);
                })
            }
        })
        
    


    })
    function displayComment(id) {
        $.ajax({
            url: "/articles/" + id,
            method: "GET"
        }).then(function (data) {

            if (data.note) {
                $("#commentTitle").text(data.note.title);
                $("#commentBody").text(data.note.body);
            }
            else {
                $("#commentTitle").text("No note saved");
                $("#commentBody").text("--no note--");
            }
        })
    }
})
