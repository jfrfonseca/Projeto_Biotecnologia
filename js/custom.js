function changeElements(index){
//window.scrollTo(0,scrollorama.getScrollpoints()[ui.value]);
	$('#mutant div').each(function(){
		var txt = this.getAttribute('id');
		$("#"+txt).hide();
	});

	$('#textblock p').each(function(){
		var txt = this.getAttribute('id');
		$("#"+txt).css('text-decoration', 'none');
	});


	$("#m"+index).show();
	$("#t"+index).css('text-decoration', 'underline');
}

function setwikiLinks(){
	$(".wikilink").on('click', function(){
		if($("#wikimodal")){
			$("#wikimodal .modal-title").html(this.getAttribute('data-title'));
			$('#wikimodal .modal-body').load("wiki/"+this.getAttribute('data-content'));
		}
	});
}