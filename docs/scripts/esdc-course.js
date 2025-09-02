//Get the button
var mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Open the details when printing
var beforePrint = function() {
    $("details").attr('open', '');
};
var afterPrint = function() {
    $("details").removeAttr('open');
};
if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
        if (mql.matches) {
            beforePrint();
        } else {
            afterPrint();
        }
    });
}

// IE, Firefox
window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;

$("#expandAllButton").click(function() {
  $(this).click();
  $(this).prop('disabled', true);
  $("#collapseAllButton").prop('disabled', false);
});

$("#collapseAllButton").click(function() {
  $(this).click();
  $(this).prop('disabled', true);
  $("#expandAllButton").prop('disabled', false);
});

$("#highLevelButton").click(function(){
	$("#modules").addClass("hlv");
	$(this).prop('disabled', true);
	$("#comprehensiveButton").prop('disabled', false);
	$("#expandButtons").addClass("displaynone");
	$("details").attr('open', '');
	$("#expandAllButton").prop('disabled', false);
	$("#collapseAllButton").prop('disabled', true);
	

});

$("#comprehensiveButton").click(function(){
	$("#modules").removeClass("hlv");
	$(this).prop('disabled', true);
	 $("#highLevelButton").prop('disabled', false);
	 $("#expandButtons").removeClass("displaynone");
	 $("details").removeAttr('open');
});