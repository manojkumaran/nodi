$(function(){
    function loadmoreCallback(data){
        var output = '';
        $.each(data, function(key, item){
            
           output+=  '<div class="col-md-4">' ;
           output+= '<h2>'+ item.skuId +'</h2>' ;
           output+=      '<img src="'+ item.imageUrl + item.mediumImageUrl+ '" alt="item.shortDescription"/>';
           output+=      '<p>'+item.shortDescription +'</p>';
           output+= '<p><a class="btn btn-primary" href="#" role="button" data-skuId="'+item.skuId+'">Add to Cart</a></p>';
           output+= '</div>';

        });

        $('.more').append(output);
    }

    $('.atc').on('click', function(e){
        alert("Sku "+$(this).attr('data-skuId')+" added to cart");
    });

    $(".loadmore").on('click', function(){
        $.getJSON('/api', loadmoreCallback);
    });
});

