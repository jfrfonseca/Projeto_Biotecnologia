/**
  * Função que recebe por parâmetro as URL com os elementos mutantes e o arquivo html de texto para serem
  * carregados na página que chama a função
  * @param hash{'textblock' : 'caminho_do_arquivo_text.html', 'mutant' : 'caminho_do_arquivo_mutant.html'}
  */
function carregarConteudo(options){
	var urlTextblock = (options["textblock"] ? options["textblock"] : "error.html");
	var urlMutant = (options["mutant"] ? options["mutant"] : "error.html");
	
	//Carregando mutants
	$.get(urlMutant, function(result) {
		$('#mutant').html(result);
	})
		.done(function() {
			$('#mutant div').each(function(){
				var txt = this.getAttribute('id');
				$("#"+txt).hide();
			});
		})
		.fail(function() { 
			console.log("Erro ao carregar animações"); 
		})
		.always(function() { 
			//Carregando texto
			$.get(urlTextblock, function(result) {
				$('#textblock').html(result);
			})
				.done(function() { 
					ajustarSlider();
				})
				.fail(function() { 
					console.log("Erro ao carregar conteudo"); 
				})
		})
}

		var inPlay = 0;		
		var falaAtual = 1;
		var t;
		var tn;
		var ti;
		var tempoDecorrido;
		var timer;
		var timerCurrent;
		var timerFinish;
		var timerSeconds;
		var animados = [];
		
		function drawTimer(percent){
			$('div.timer').html('<div class="percent"></div><div id="slice"'+(percent > 50?' class="gt50"':'')+'><div class="pie"></div>'+(percent > 50?'<div class="pie fill"></div>':'')+'</div>');
			var deg = 360/100*percent;
			$('#slice .pie').css({
				'-moz-transform':'rotate('+deg+'deg)',
				'-webkit-transform':'rotate('+deg+'deg)',
				'-o-transform':'rotate('+deg+'deg)',
				'transform':'rotate('+deg+'deg)'
			});
			$('.percent').html(Math.round(percent)+'%');
		}
		
		function animarTexto(numero) {
			$('.tlt'+numero).textillate({
				minDisplayTime: -1,
				autoStart: true,
				// in animation settings
				in: {
					effect: 'fadeIn',
					delayScale: 0.9,
					delay: 50,
					callback: function () {}
				},
				// out animation settings.
				out: {
				},
				// callback that executes once textillate has finished 
				callback: function () {
					document.getElementById("som").pause();
				}
			});
		}
		
		function animarNarrador(numero){		
			var lado = numero%2;
			var jaAnimado = animados.indexOf(numero);
			if(lado == 0){
				if(jaAnimado > -1){
					$('#narradorFala'+numero).animate({"right": "-=500px"}, "fast");
					animados[jaAnimado] = -1;
				}
				$('#narradorFala'+numero).animate({"right": "+=500px"}, "slow");
				animados.push(numero);
			}
			if(lado == 1){
				if(jaAnimado > -1){
					$('#narradorFala'+numero).animate({"left": "-=500px"}, "fast");
					animados[jaAnimado] = -1;
				}
				$('#narradorFala'+numero).animate({"left": "+=500px"}, "slow");
				animados.push(numero);
			}
		}
		
		function alternaFala(numero){
            document.getElementById("som").src=soundFiles[numero-1];
            document.getElementById("som").play();
			for (i=0; i<=numFalas; i++){
				document.getElementById("fala"+i).style.display="none";
			}
			document.getElementById("fala"+numero).style.display="block";
			animarNarrador(numero);
			animarTexto(numero);
		}
		
		function runTime(limite){
			var step = 100;
			if(tempoDecorrido <= limite && inPlay == 1){
				drawTimer((tempoDecorrido/limite)*100);
				tempoDecorrido = tempoDecorrido + step;
				t=setTimeout(function(){runTime(limite)},step);
			}
		}
		
		function play(){
			if(falaAtual <= numFalas && inPlay == 1){
				t=0;
				ti=0;
				inPlay = 1;
				tempoDecorrido = 0;
				alternaFala(falaAtual);
				runTime(tempoFala[falaAtual-1]);
				ti=setTimeout(function(){play()},tempoFala[falaAtual-1]);
				falaAtual++;
			}else{
				inPlay=0;
			}
		}
		
		function rewind(){
			clearTimeout(ti);
			clearTimeout(t);
			inPlay = 0;
			falaAtual = falaAtual - 2;
			if (falaAtual < 1){
				falaAtual = 1;
			}
			inPlay = 1;
			play();
		}
		
		function foward(){
			clearTimeout(ti);
			clearTimeout(t);
			inPlay = 0;
			falaAtual++;
			if (falaAtual > numFalas){
				falaAtual = numFalas;
			}
			inPlay = 1;
			play();
		}
		
		function toggle(){
			if(inPlay == 1){
				clearTimeout(ti);
				clearTimeout(t);
				inPlay = 0;
				var img = document.getElementById("playPause");
				img.src="../../img/play.png";
			}else{
				inPlay = 1;
				var img = document.getElementById("playPause");
				img.src="../../img/pause.png";
				play();
			}
		}
		
				
function alternaConteudo(numero){
	for (i=1; i<=numTabs; i++){
		document.getElementById(""+i).innerHTML="<img src='../../img/tabInactive1.png' height='40px'><div style='position:relative; top:-37px; left:2px;'>"+i+"</div>";
	}
	document.getElementById(numero).innerHTML="<img src='../../img/tabActive.png'  height='40px'><div style='position:relative; top:-37px; left:2px;'>"+numero+"</div>";
	document.getElementById("tabContent").innerHTML='<iframe src=\'conteudoAba'+numero+'.html\' scrolling=\'no\' frameborder=\'0\' width=\'100%\' height=\'100%\' seamless></iframe>';
	if(abasComApendices.indexOf(""+numero)>=0){
		document.getElementById("vejaMais").innerHTML='<iframe src=\'apendiceAba'+numero+'.html\' scrolling=\'no\' frameborder=\'0\' width=\'100%\' height=\'100%\' seamless></iframe>';
	}
}