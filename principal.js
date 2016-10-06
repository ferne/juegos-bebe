/***********************************************************************
* Juegos Bebé adaptados a las capacidades de los más pequeños.         *
* Copyright (C) 2016  Matías Tárraga, Fernando Álvarez                 *
*                                                                      *
* Juegos Bebé is free software: you can redistribute it and/or modify  *
* it under the terms of the GNU General Public License as published by *
* the Free Software Foundation, either version 3 of the License, or    *
* (at your option) any later version.                                  *
*                                                                      *
* Juegos Bebé is distributed in the hope that it will be useful,       *
* but WITHOUT ANY WARRANTY; without even the implied warranty of       *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the        *
* GNU General Public License for more details.                         *
*                                                                      *
* You should have received a copy of the GNU General Public License    *
* along with this program.  If not, see <http://www.gnu.org/licenses/>.*
***********************************************************************/

var casillas_Ancho = 50;
var casillas_Alto = 30;
var ancho = 25;
var alto = 25;
var gap = 3;
var validos=[];
var borde=[];
var cuadrados=[];

var tablero = new Array(casillas_Alto);
for(i=0;i<tablero.length;i++){
    tablero[i]=new Array(casillas_Ancho);
}
function limpiar(){
     for(z=0;z<validos.length;z++){
        validos[z].style.fill="rgb(250,250,250)";
        validos[z].name="vacio";
     }
}
function colorear(){
    var color=[];
	for (var i = 0; i < 3; i++) {
		color[i]=Math.round((Math.random()*180)+75);
	}
	if(this.name == "vacio" ){
	    this.style.fill="rgb("+color[0]+","+color[1]+","+color[2]+")";
	    this.name="lleno";
	}
	else{
	    limpiar();
	}
}
function caminitos() { 
    for(n=0;n<validos.length;n++){
            validos[n].addEventListener("mouseover",colorear,true);//Importante esta forma para la forma de propagación.
//            validos[n].addEventListener("touchmove",colorear,true);
    }
    for(p=0;p<borde.length;p++){
            borde[p].onmouseover=limpiar;
    }
    
}

function dibujar() {
    var espacio = document.getElementById("tablero");
    var espacio2 = document.getElementById("tablero2");
    var y = 0;
    var casilla = 0;
    var anchoFinal = ancho-gap;
    var altoFinal = alto-gap;
    var ancho_Caja = casillas_Ancho * ancho * 1.2
    var alto_Caja = casillas_Alto * alto * 1.2

    var caja = document.getElementsByTagName("svg")[0];
    caja.setAttribute("viewBox", "0 0 "+ancho_Caja+"  "+alto_Caja+""); 


    for(j=0;j<tablero.length;j++){
        var x = 0;
        for(k=0;k<tablero[j].length;k++){
            var clase = "valido";
            if ((j == 0) || (j == tablero.length - 1) || (k == 0) || (k == tablero[j].length - 1)){
                clase = "borde"
                }
            espacio.insertAdjacentHTML("beforeEnd", "<rect x='"+(x+2)+"' y='"+(y+2)+"' width='"+anchoFinal+"' height='"+altoFinal+"'/>");
            espacio2.insertAdjacentHTML("beforeEnd", "<rect name='vacio' id='"+casilla+"' class='"+clase+"' x='"+x+"' y='"+y+"' width='"+ancho+"' height='"+alto+"'/>");
            casilla++;
            x+= ancho+gap;
        }
        y+= alto+gap;
    }
    cuadrados = document.getElementsByTagName("rect");
    validos = document.getElementsByClassName("valido");
    borde = document.getElementsByClassName("borde");
    caminitos();
}
window.onload=function(){
	dibujar();
}
