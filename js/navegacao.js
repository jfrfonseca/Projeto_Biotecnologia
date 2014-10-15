/**
 * Funções da Janela Externa
 */
 function alternaCenario(numero){
	cenarioAtual = numero;
	document.getElementById("cenario").innerHTML='<iframe id="scene" src=\'cenario'
		+numero+'.html\' scrolling=\'no\' frameborder=\'0\' width=\'100%\' height=\'100%\' seamless></iframe>';
}
		
function escalar(){
	var largura = 1020;
	var altura = 700;
	var ajuste = (window.innerHeight/altura);
	document.getElementById("container").style.transform = "scale("+ajuste+")";
}

/**
 * Funções da Janela Interna
 */
function carregaTomada(numero){
	document.getElementById("tomada"+numero).style.display="";
	parent.document.getElementById("proximo").style.display="";
	if((cenarioAtual == parent.numCenarios) && (numero == numTomadas)){
		parent.document.getElementById("proximo").style.display="none";
	}
	var texto = '<audio id="audioPlay" controls ';
	if (parent.auto) {
		texto += 'autoplay';
	}
	texto += '><source id="audioMP3" src="sons/'
		+locucoes[numero]
		+'.wav" type="audio/wav"><embed id="audioEMBEB" height="50" width="100" src="sons/'
		+locucoes[numero]
		+'.wav"> Seu navegador não suporta arquivos WAV. O audio desta atividade não pode ser reproduzido.</audio>';
		/*
		+'.mp3" type="audio/mpeg"><embed id="audioEMBEB" height="50" width="100" src="sons/'
		+locucoes[numero]
		+'.mp3"> Seu navegador não suporta arquivos MP3. O audio desta atividade não pode ser reproduzido.</audio>';
		*/
	parent.document.getElementById("som").innerHTML=texto;	
}

function avancaTomada(now){
	const loadTime = 1000;
	const refreshTime = 100;
	var pass = now;
	if(tomadaAtual == 0){
		escondeTomada(tomadaAtual);
		tomadaAtual = tomadaAtual + 1;
		carregaTomada(tomadaAtual);
		window.setTimeout(function(){avancaTomada(0)}, loadTime);
	}
	var inPlay = parent.document.getElementById("audioPlay");
	//alert(inPlay.ended);
	if (pass == 1 || (inPlay != null && inPlay.ended)){
		if(tomadaAtual < numTomadas){
			escondeTomada(tomadaAtual);
			tomadaAtual = tomadaAtual + 1;
			carregaTomada(tomadaAtual);
			window.setTimeout(function(){avancaTomada(0)}, loadTime);
		} else {
			if (cenarioAtual == parent.numCenarios){
				parent.window.location.href = "../../index.html";
			} else {
				parent.alternaCenario(cenarioAtual+1);
			}
		}
	} else {
		window.setTimeout(function(){avancaTomada(0)}, refreshTime);
	}
}
		
function retornaTomada(){
	escondeTomada(tomadaAtual);
	if (tomadaAtual != 1){
		tomadaAtual = tomadaAtual - 1;
		carregaTomada(tomadaAtual);
	}else{
		if(cenarioAtual == 1){
			parent.window.location.href = "../../index.html";
		} else {
			parent.alternaCenario(cenarioAtual-1);
		}
	}
}				

function escondeTomada(numero){
	if(tomadaAtual > 0){
		document.getElementById("tomada"+numero).style.display="none";
	}
}

function cliqueAvanca(objeto, tomadaAtivacao){
	if(tomadaAtual==tomadaAtivacao){
		$("#"+objeto).zoomTo({targetsize:1.00, 
			duration:1200,
			easing: "ease",
			nativeanimation: true,
			animationendcallback: 
			function(){	
				parent.alternaCenario(cenarioAtual+1);
			}
		});
	}
}

function automatico(){
	if(parent.auto){
		parent.auto = false;
		parent.document.getElementById("autoIcon").src="../../img/pause.png";
		parent.document.getElementById("audioPlay").pause();
	} else {
		parent.auto = true;
		parent.document.getElementById("autoIcon").src="../../img/play.png";
		parent.document.getElementById("audioPlay").play();
	}
}

