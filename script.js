//interakcja
let czy_wygenerowane = false;
let more_info = false;
let petla_wewn = false;
let petla_zewn = false;

let swapInterval = null;
let bars = [];

window.onload = function() {
	document.querySelector(".goTop").style.display = "none";
	var hr = document.getElementById("hr");
	var mn = document.getElementById("mn");
	var sc = document.getElementById("sc");
			
	setInterval(()=>{
		var date = new Date();
		var hh = date.getHours(); //do 360
		var mm = date.getMinutes();
		var ss = date.getSeconds();
			
		hr.style.transform = `rotateZ(${hh*30+(mm/2)}deg)`;
		mn.style.transform = `rotateZ(${mm*6}deg)`;
		sc.style.transform = `rotateZ(${ss*6}deg)`;
			
		document.getElementById("hours").innerHTML = ((hh<10)? "0"+hh : hh) + ":";
		document.getElementById("minutes").innerHTML = ((mm<10)? "0"+mm : mm)+":";
		document.getElementById("seconds").innerHTML = ((ss<10)? "0"+ss : ss);		
	}, 1000);
}

window.onscroll = function(){
	if (document.documentElement.scrollTop > 150) {
        document.querySelector(".goTop").style.display = "block";
    } else 
        document.querySelector(".goTop").style.display = "none";
}

function pokazWiecej(){
	if(!more_info){
		document.getElementById("dodatkowe").style.display = "block";
		more_info = true;
	}
	else{
		document.getElementById("dodatkowe").style.display = "none";
		more_info = false;;
	}	
}

function petla_wew(){
	if(!petla_wewn){
		document.getElementById("petla_wew").style.display = "block";
		document.querySelector(".pokaz_ukryj1").innerHTML = "Ukryj!";
		petla_wewn = true;
	}
	else{
		document.getElementById("petla_wew").style.display = "none";
		document.querySelector(".pokaz_ukryj1").innerHTML = "Pokaż!";
		petla_wewn = false;;
	}	
}

function petla_zew(){
	if(!petla_zewn){
		document.getElementById("petla_zew").style.display = "block";
		document.querySelector(".pokaz_ukryj2").innerHTML = "Ukryj!";
		petla_zewn = true;
	}
	else{
		document.getElementById("petla_zew").style.display = "none";
		document.querySelector(".pokaz_ukryj2").innerHTML = "Pokaż!";
		petla_zewn = false;;
	}	
}

function czysc(tab){ 	
    while(tab.length) 
      tab.pop();
}

function generuj() {
   
	var ile = document.getElementById("generuj").value;
    const canvas = document.getElementById('myCanvas'), ctx = canvas.getContext('2d');
		
	if(ile<3 || ile>10 || isNaN(ile)){
		document.querySelector(".walidacja_elementow").innerHTML = "<b>Podaj ilość elementów do wygenerowania z zakresu 3-10</b>";
        document.querySelector(".walidacja_elementow").style.color = "red";
		document.getElementById("nie_wygenerowano").style.display= "none";
	}   
    else{
		document.querySelector(".walidacja_elementow").innerHTML="";
		document.querySelector(".elementy").innerHTML = "Ilość elementów do posortowania";
		document.querySelector(".elementy").style.color = "#F0F0F0";
		document.getElementById("nie_wygenerowano").style.display= "none";
		document.getElementById("info").style.display= "block";
        czysc(bars);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var X, barW, dx;
        X = barW = dx = canvas.width/(ile*2 +1);

        for(var i=0; i<ile; i++){
            var barH = parseInt((Math.random()*20)+1);
            bars.push({ val: barH, w: barW, h: barH*17, x: X, y: canvas.height-30, color: "#F0F0F0"});
					
            for(var j=0; j<bars[i].h; j++){
                ctx.fillStyle = "#F0F0F0";
				setTimeout(ctx.fillRect.bind(ctx, X, canvas.height-35, barW, -j),  j );
                ctx.textAlign = "center";
                ctx.font = "20px Calibri";
                ctx.fillText(bars[i].val, bars[i].x + bars[i].w/2 -1, bars[i].y + 16);
            }
            X+=dx*2;
        }
		czy_wygenerowane=true;
    }
}
  
function swap(barA, barB){
    var xA, xB, xTmpA, xTmpB;

    if(!swapInterval){ 
        barAx = barA.x;
        barBx = barB.x;
        xTmpA = barA.x;
        xTmpB = barB.x;
		
		if(barA.val > barB.val){
			barA.color = "red";
			barB.color = "red";
		} 
		else{
			barA.color = "blue";
			barB.color = "blue";
		}
		
        swapInterval = setInterval(Animacja, 2);
    } 
	else setTimeout(swap.bind(null, barA, barB), 1000);
    
	function Animacja(){
		if(xTmpA >= barBx || xTmpB <= barAx){
			barA.color = "#F0F0F0";;
			barB.color = "#F0F0F0";;
            clearInterval(swapInterval);
			swapInterval = null;
        } 
		else{
			if(barA.val >barB.val){
                barA.x++; barB.x--;
            }
			xTmpA++; xTmpB--;
        }
		animSwap();
    }
}

function animSwap(){
	const canvas = document.getElementById('myCanvas'), ctx = canvas.getContext('2d');
	ctx.fillStyle = "#005476";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for(var i=0; i < bars.length; i++){
		ctx.fillStyle = bars[i].color;
        ctx.fillRect(bars[i].x, bars[i].y, bars[i].w, -bars[i].h);
		ctx.stroke();
        ctx.textAlign = "center";
        ctx.font = "20px Calibri";
        ctx.fillText(bars[i].val, bars[i].x + bars[i].w / 2 -1, bars[i].y + 18);
    }	
}

function sortuj(){
    var licznik_zmian = 0;
	var licznik_porownan = 0;

	if(czy_wygenerowane){
		for(var i=0; i < bars.length - 1; i++){
			for(var j=0; j < bars.length - 1 - i; j++){
				licznik_porownan++;
				swap(bars[j], bars[j+1]);
				if(bars[j].val > bars[j+1].val) {
					licznik_zmian++;
					var temp = bars[j];
					bars[j] = bars[j+1];
					bars[j+1] = temp;
				}
			}
			setTimeout(() => {}, 1000);
		}
	}
	else document.getElementById("nie_wygenerowano").style.display= "block";	
	
	document.getElementById("ile_iteracji").innerHTML = "Wykonano " + licznik_porownan +  (licznik_porownan<=4? " porównania i ": " porównań i ") + licznik_zmian + ((licznik_zmian!=0 && licznik_zmian<=4)? (licznik_zmian==1? " zamianę." : " zamiany.") : " zamian.");
}