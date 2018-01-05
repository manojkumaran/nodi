

function showResponse(res){
    var output= '';
    $.each(res.items, function(key, item){
        output+= '<div class="card vid-card" data-video-ID='+ item.id.videoId +'>' ;
        output+= '<img src="'+item.snippet.thumbnails.medium.url+'" alt="'+ item.snippet.title +'"/>' ;
        output+=     '<p class="card-text">'+ item.snippet.description + '</p>' ;
        output+=  '</div>' ;
    });
    document.getElementById('vids').innerHTML = output;
}

function onSearchResponse(res){
    showResponse(res);
}

function search(){
    var request = gapi.client.youtube.search.list({
        q: 'paper crafts',
        part: 'snippet'
    });

    request.execute(onSearchResponse);
}

function onYouTubeApiLoad(){
    gapi.client.setApiKey(window.uTubeApiKey);
    search();
}

function onClientLoad(){
    gapi.client.load('youtube','v3',onYouTubeApiLoad);
}


$('#vids').on('click', '.vid-card', function(){
    var vidId = $(this).attr('data-video-ID');
    $('#vidframe').attr('src','https://www.youtube.com/embed/'+vidId);
    $('#vidframe').show();
});