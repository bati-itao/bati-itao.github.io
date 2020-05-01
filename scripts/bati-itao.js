
// When WET is ready
$( document ).on( "wb-ready.wb", function( event ) {
    
    // Print function for adding print button (add class"printMe" to button)
    $('.printMe').click(function(){
        window.print();
    });

    // Adds resize function to `textarea` for everything to be visible when printing, add class="expend" to `textarea`
    $('.expand').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});