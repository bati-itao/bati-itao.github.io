	$(document).ready(

    function() {
      // To make this work, I added a dataset value to each input button.
      // using data-class='...' you can now have the input button tell which
      // class to toggle without having to hard code it in your functions.

      // This does the job of those repeated change() functions below
      $('form input').change(function(){
        console.log($(this).attr('id'));
        var dataClass = '.' + $(this).data('class');
        $(dataClass).toggle();
        if ($(this).attr('id') != 'wcag21-label') {
          $('form select#components').changeComponent();
        }
      });

      $("#showAll").click(function(){
      	$("section").show();
      	$("article").show();
      	$("div").show();
      });

      $("#filter").click(function(){
        $('form select#components').changeComponent();
      })

      // We separate out the component function so we can call it from anywhere.
      $.fn.changeComponent = function() {
        var optionSelected = $("option:selected", this);
        var valueSelected = optionSelected.prop('value');
        if (valueSelected != 'Filter by component:') {
          $("article").not("[data-success]").hide().stateToggle(valueSelected);
          $("section").not("[data-success-title='" + valueSelected + "']").hide().stateToggle(valueSelected);
          $("article[data-success]").filter(function(){
            if ($(this).find('section:visible').length === 0) {
              $(this).hide().stateToggle(valueSelected);
            }
          });
        }
      };

      // The stateToggle allows us to control each element independently.
      $.fn.stateToggle = function(valueSelected) {
        $('form input').each(function(){
          if ($(this).prop('checked')) {
            dataClass = '.' + $(this).data('class');
            $(dataClass +' section[data-name="'+ valueSelected +'"]').show();
            $('article'+ dataClass +':has(section[data-name="'+ valueSelected +'"])').show();
            $("section[data-success-title='" + valueSelected + "']").show();
            $("article[data-success]").filter(function(){
              if ($(this).find('section:visible').length !== 0) {
                $(this).show();
              }
            });
          }
        });
      };

    }
  );
