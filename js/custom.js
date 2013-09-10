/*function loadText(menu){
	$('#textblock').load("conteudo/"+menu+"/text.html");
}

$('.btn-menu').click(function() {
	$('.btn-menu').each(function() {
		var menu = $(this).attr("attr-menu");
		var opcao = $(this).attr("attr-opcao");
		var id = "#content_"+menu+"_"+opcao;
		$(id).hide();
	});
	var menu = $(this).attr("attr-menu");
	var opcao = $(this).attr("attr-opcao");
	var id = "#content_"+menu+"_"+opcao;
	$(id).show('display');
});

$('.btn-menu').each(function() {
		var menu = $(this).attr("attr-menu");
		var opcao = $(this).attr("attr-opcao");
		carregar(menu, opcao);
});

$(function(){
	var cont = 0;
	$('.btn-menu').each(function() {
		if(cont > 0){
			var menu = $(this).attr("attr-menu");
			var opcao = $(this).attr("attr-opcao");
			var id = "#content_"+menu+"_"+opcao;
			$(id).hide();
		}
		cont += 1;
	});
});*/

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
