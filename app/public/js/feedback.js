$(function(){

    $.getJSON('feeds', updateFeedback);

    $('.form-signin').submit(function(e){
        e.preventDefault();
        let that = $(this);
        $.post('/feeds', {
            email: that.find('.email').val(),
            desc: that.find('.desc').val()
        }, updateFeedback);
    });


    function updateFeedback(data){
        let output = '';
        $.each(data, function(key, item){
            output+= '       <article class="feedback-item"> ';
            output+= '                  <h6>' +  item.email + '</h6> ';
            output+= '                  <p>' + item.desc +'</p> ';
            output+= '       </article> ';
        });
       $('#recent-feed').html(output);
    }

    
})

