$(function(){
    $(".titles").on("click", function (event) {
        $("#articleComments").modal("toggle")
        var id = $(this).data("id")
         $("#submit").attr("data-id", id);
        
    })
    // $(".articles").on("click", function (event) {
    //     $("#submit").on("click", function (event) {
    //         event.preventDefault();
    //         var id = $("#submit").data("id");
    //         var title = $("#commentTitle").val();
    //         var body = $("#commentBody").val();

    //         var note = {
    //             title: title,
    //             body: body
    //         }
    //         $.ajax({
    //             url: "/articles/" + id,
    //             method: "POST",
    //             data: note
    //         }).then(function (data) {
    //             console.log("post done")
    //             displayComment(id);
    //         })
    //     })
    // })
    function displayComment(id) {
        $.ajax({
            url: "/articles/" + id,
            method: "GET"
        }).then(function (data) {
            if (data.note.title && data.note.body) {
                $("#postTitle").html(data.note.title);
                $("#postBody").text(data.note.body);
            }
            else {
                $("#postTitle").html("No note saved");
                $("#postBody").text("--no note--");
            }
        })
    }
})
