	$(document).ready(

    function() {
      $('form input').change(function(){
        console.log($(this).attr('id'));
        var dataClass = 'article[data-level=' + $(this).data('class') +']';
		var dataClassLi = 'li[data-level=' + $(this).data('class') +']';
		//toggle doesnt work in this scenario since the acoordion content is hidden already so messes up the logic
        if($(this).is(':checked')){
			$(dataClass).show();  // checked
			$(dataClassLi).show();  // checked
		}
		else{
			$(dataClass).hide();  // unchecked
			$(dataClassLi).hide();  // unchecked
		}
      });     

    }
  );
